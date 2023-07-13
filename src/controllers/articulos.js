const { request, response } = require("express");
const conecction = require("../config/connection");
const fireStorage = require("../config/fireStorage");
const querys = require("../helpers/consultas-helper");
const articulosHelper = require("../helpers/articulos-helper");

const getAll = async (req = request, res = response) => {
    try {
        //verificar si hay query para buscar por nombre
        if (req.query.query) {
            const nombre = req.query.query || "";
            const [ result ] = await conecction.query(querys.getAllArticulosByName,["%" + nombre + "%"]);

            //recorre el resultado y agrega las fotos de cada articulo
            const resultado = await articulosHelper.populateArticulosFotos(result);

            return res.json(resultado);
        }

        const limit = + req.query.limit || 10;
        const page = limit * (req.query.page - 1 || 0);

        const [ result ] = await conecction.query(querys.getAllArticulos, [limit, page]);
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
    let multimedios = req.files.multimedios;

    try {
        if (!Array.isArray(multimedios)) 
            multimedios = [req.files.multimedios];

        //JSON.PARSE(req.body.data) -> convierte el stringified en un objeto
        const { nombre, descripcion, categoria_id } = JSON.parse(req.body.data);

        //inserta el articulo y retorna el articulo insertado
        const articulo = await articulosHelper.insertArticuloAndGetIt(nombre, descripcion, categoria_id);

        //sube los multimedios al storage y los sube a la base de datos
        await articulosHelper.uploadMultimedios(multimedios, articulo[0].id);

        //retorna el articulo con los multimedios
        const articuloPopulated = await articulosHelper.populateArticuloMultimedios(articulo);

        res.status(201).json(articuloPopulated);
    } catch (error) {
        res.status(500).send(error);
    }
};  

//recibe el id de un articulo y lo elimina con sus multimedios
const deleteArticle = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const [ result ] = await conecction.query( querys.getAllMultimediosId, [id] );

        //Eliminar los multimedios de fireBase
        for (const multimedios of result) {
            await articulosHelper.borrarMultimedios(multimedios.id);
        }

        await conecction.query(querys.deleteArticulo, [id]);
        res.status(200).send(true);

    } catch (error) {
        res.status(500).send('Something Went Wrong');
    }
};

//recibe un array de multimedios, un objeto stringified con los datos del articulo
// y con un array con los id de los multimedios a eliminar en formato form-data
//multimedios -> trae los archivos multimedios, data  -> trae los datos del articulo con el id del articulo a borrar
//ejemplo const formdata = new FormData(); --> formdata.append('multimedios', file); 
//--> formdata.append('data', JSON.stringify({nombre: 'nombre', descripcion: 'descripcion', categoria_id: 1, articulosBorrarId: [1,2,...], articulo_id: 1}))
const editArticle = async (req = request, res = response) => {
    let multimedios = req.files.multimedios;

    try {
        if (!Array.isArray(multimedios)) 
            multimedios = [req.files.multimedios];

        const { articulo_id, nombre, descripcion, categoria_id, articulosBorrarId } = JSON.parse(req.body.data);

        for (const id of articulosBorrarId) {
            await articulosHelper.borrarMultimedios(id);
        }

        await articulosHelper.uploadMultimedios(multimedios, articulo_id);
        await conecction.query(querys.updateArticulo, [nombre, descripcion, categoria_id, articulo_id]);

        const [ articulo ] = await conecction.query(querys.getArticuloById, [articulo_id]);
        const articuloPopulated = await articulosHelper.populateArticuloMultimedios( articulo );

        res.status(201).json(articuloPopulated);
    } catch (error) {
        res.status(500).send('Something Went Wrong');
    }
};

module.exports = {
  getAll,
  createArticle,
  getArticle,
  editArticle,
  deleteArticle,
};
