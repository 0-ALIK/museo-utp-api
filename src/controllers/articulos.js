const { request, response } = require('express');
const conecction = require('../config/conecction');
const fireStorage = require('../config/fireStorage');

const getAll = async (req = request, res = response) => {
    // const [result] = await conecction.query('SELECT * FROM articulos');
    // res.json(result);
    res.send('hola desde /api/articulos/all')
};

const createArticle = async (req = request, res = response) => {
   //const multimedios = req.files.multimedios;
   res.send('hola desde crear articulos POST /api/articulos')
};

const getArticle = async (req = request, res = response) => {
     const { id } = req.params;
     //select f.id_multimedios, f.url as fotos, v.url as videos, a.url as audios 
     //from multimedios as f
     //left outer join multimedios v on f.id_multimedios = v.url AND v.tipo = 'video'
     //left outer join multimedios a on f.id_multimedios = a.url AND a.tipo = 'audio'
     //where f.tipo = 'foto'
     //const query = 'SELECT id_articulos, nombre, descripcion,categoria_id, create_at, update_at,  FROM articulos join multimedios on articulos.id_articulos = multimedios.articulos_id WHERE id_articulos = ?';
     //const [result, metadata] = await conecction.query(query, [id]);
     //res.json(result);
    res.send('hola desde /api/articulos/:id , '+ id)
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