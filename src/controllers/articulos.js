const { request, response } = require("express");
const conecction = require("../config/connection");
const querys = require("../helpers/consultas-helper");
const articulosHelper = require("../helpers/articulos-helper");
const { crearConsultaUpdate, validarDataForUpdate } = require("../helpers/database-helpers");

const getAll = async (req = request, res = response) => {
    try {
        //verificar si hay query para buscar por nombre
        let extras = "";
        let data = []

        if(req.query.query && req.query.query?.length !== 0) {
            extras+="LOWER(ar.nombre) LIKE CONCAT('%', LOWER( ? ), '%') ";
            data.push( req.query.query );
        }

        if(req.query.categoria && req.query.categoria?.length !== 0) {
            if(extras.length !== 0)
                extras+="AND ";
            extras+="ar.categoria_id = ? ";
            data.push( req.query.categoria );
        }

        if(req.query.min && req.query.min?.length !== 0) {
            if(extras.length !== 0)
                extras+="AND ";
            extras+="ar.year >= ? ";
            data.push( req.query.min );
        }

        if(req.query.max && req.query.max?.length !== 0) {
            if(extras.length !== 0)
                extras+="AND ";
            extras+="ar.year <= ? ";
            data.push( req.query.max );
        }

        if(extras.length !== 0) {
            const [ result ] = await conecction.query( querys.getAllArticulos + 'WHERE ' + extras + 'ORDER BY ar.year ASC ', data );    
            const articulos = await articulosHelper.populateArticulosFotos(result);
            return res.status(200).json(articulos);
        }

        const [ result ] = await conecction.query( querys.getAllArticulos + 'ORDER BY ar.year ASC' );
        const articulos = await articulosHelper.populateArticulosFotos(result);
        res.status(200).json(articulos);
    } catch (error) {
        res.status(500).json({
            msg: 'Algo salió mal al obtener todos los articulos',
            error
        });
    }
};

const getArticle = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const [ result ] = await conecction.query(querys.getArticuloById, [id]);

        if(result.length === 0) {
            return res.status(400).json({msg: 'No existe articulo con id: '+id});    
        }

        //popula el articulo con sus multimedios
        const articulo = await articulosHelper.populateArticuloMultimedios(result);

        res.status(200).json(articulo);
    } catch (error) {
        res.status(500).json({
            msg: 'Algo salió',
            error
        });
    }
};

// recibe un array de multimedios y un objeto stringified con los datos del articulo en formato form-data
// multimedios -> trae los archivos multimedios, data  -> trae los datos del articulo
// ejemplo const formdata = new FormData(); --> formdata.append('multimedios', file); 
// --> formdata.append('data', JSON.stringify({nombre: 'nombre', descripcion: 'descripcion', categoria_id: 1}))
const createArticle = async (req = request, res = response) => {

    let multimedios = null;

    if(req.files && req.files.multimedios) {
        multimedios = req.files.multimedios;
        if (!Array.isArray(multimedios)) 
            multimedios = [req.files.multimedios];
    }

    //JSON.PARSE(req.body.data) -> convierte el stringified en un objeto
    const { nombre, descripcion, categoria_id, ubicacion, dueno, year } = req.body;

    try {
        //inserta el articulo y retorna el articulo insertado
        const articulo = await articulosHelper.insertArticuloAndGetIt(nombre, descripcion, categoria_id, ubicacion, dueno, year);

        //sube los multimedios al storage y los sube a la base de datos
        if(multimedios)
            await articulosHelper.uploadMultimedios(multimedios, articulo[0].id);

        //retorna el articulo con los multimedios
        const articuloPopulated = await articulosHelper.populateArticuloMultimedios(articulo);

        res.status(201).json(articuloPopulated);
    } catch (error) {
        res.status(500).send({
            msg: 'No se pudo crear el nuevo artículo',
            error,
            body: req.body
        });
    }
};  

//recibe el id de un articulo y lo elimina con sus multimedios
const deleteArticle = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const [articulos] = await conecction.query(querys.getArticuloById, [id]);

        if(articulos.length === 0) 
            return res.status(400).json({msg: 'No existe articulo con id: '+id});    

        const [ multimedios ] = await conecction.query( querys.getAllMultimediosId, [id] );

        //Eliminar los multimedios de fireBase
        for (const multimedio of multimedios) {
            await articulosHelper.borrarMultimedios(multimedio.id, id);
        }
        await conecction.query(querys.deleteArticulo, [id]);
        res.status(200).send(articulos[0]);
    } catch (error) {
        res.status(500).send({
            msg: 'Algo salio mal al realizar la eliminación del artículo: '+id,
            error
        });
    }
};

//recibe un array de multimedios, un objeto stringified con los datos del articulo
// y con un array con los id de los multimedios a eliminar en formato form-data
//multimedios -> trae los archivos multimedios, data  -> trae los datos del articulo con el id del articulo a borrar
//ejemplo const formdata = new FormData(); --> formdata.append('multimedios', file); 
//--> formdata.append('data', JSON.stringify({nombre: 'nombre', descripcion: 'descripcion', categoria_id: 1, articulosBorrarId: [1,2,...], articulo_id: 1}))
const editArticle = async (req = request, res = response) => {
    let multimedios = null;

    if(req.files && req.files.multimedios) {
        multimedios = req.files.multimedios;
        if (!Array.isArray(multimedios)) 
            multimedios = [req.files.multimedios];
    }

    const id = req.params.id;
    const { articulosBorrarId, ...data } = req.body;

    try {
        if ( !validarDataForUpdate( data, ['nombre', 'descripcion', 'categoria_id', 'ubicacion', 'dueno', 'year'] ) ) {    
            return res.status(400).json({msg: 'enviaste un dato que no se puede actualizar o no existe'});
        }

        const [ articulosVerify ] = await conecction.query(querys.getArticuloById, [id]);
        if(articulosVerify.length === 0)
            return res.status(400).json({msg: 'No existe articulo con id: '+id});    

        if(articulosBorrarId) {
            const articulosBorrarIdParse = JSON.parse( articulosBorrarId );
            for (const id_multimedio of articulosBorrarIdParse) {
                await articulosHelper.borrarMultimedios(id_multimedio, id);
            }
        }

        if(multimedios)
            await articulosHelper.uploadMultimedios(multimedios, id);

        await crearConsultaUpdate('articulo', data, 'id_articulo', id)

        const [ articulos ] = await conecction.query(querys.getArticuloById, [id]);
        const articuloPopulated = await articulosHelper.populateArticuloMultimedios( articulos );

        res.status(201).json(articuloPopulated);
    } catch (error) {
        res.status(500).send({
            msg: 'Algo salio mal al realizar la edición del artículo: '+id,
            error,
            body: req.body
        });
    }
};

module.exports = {
  getAll,
  createArticle,
  getArticle,
  editArticle,
  deleteArticle,
};
