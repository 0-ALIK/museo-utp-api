const { request, response } = require('express');
const conecction = require('../config/connection');
const fireStorage = require('../config/fireStorage');
const querys = require('../helpers/consultas-helper');
const articulosHelper = require('../helpers/articulos-helper');

const getAll = async (req = request, res = response) => {
    //verificar si hay query para buscar por nombre
    if(req.query.query){
        const nombre = req.query.query || '';
        const[result, metadata] = await conecction.query(querys.getAllArticulosByName, ['%'+nombre+'%']);
        //recorre el resultado y agrega las fotos de cada articulo
        const resultado = await articulosHelper.populateArticulosFotos(result);
        console.log(resultado);
        res.json(resultado);
        return;
     }
     const limit = +req.query.limit || 10;
     const page = limit * (req.query.page-1 || 0);
     const [result, metadata] = await conecction.query(querys.getAllArticulos, [limit, page]);
     const resultado = await articulosHelper.populateArticulosFotos(result);
     res.json(resultado);
};

const createArticle = async (req = request, res = response) => {
   //const multimedios = req.files.multimedios;
   res.send('hola desde crear articulos POST /api/articulos')
};

const getArticle = async (req = request, res = response) => {
     const { id } = req.params;
     const [result, metadata] = await conecction.query(querys.getArticuloById, [id]);
     const articulo = await articulosHelper.populateArticuloMultimedios(result);
     res.json(articulo);
    //res.send('hola desde /api/articulos/:id , '+ id)
};

const deleteArticle = async (req = request, res = response)=>{
    const { id } = req.params;
    res.send('saludos desde borrar articulo DELETE /api/articulos/:id , '+ id)
}

const editArticle = async (req = request, res = response)=>{
    const { id } = req.params;
    res.send('saludos desde editar articulo PUT /api/articulos/:id , '+ id)
}

module.exports = {
    getAll,
    createArticle,
    getArticle,
    editArticle,
    deleteArticle
}