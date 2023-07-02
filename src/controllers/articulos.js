const { request, response } = require('express');
const conecction = require('../config/conecction');

const getAll = async (req = request, res = response) => {
    // const [result] = await conecction.query('SELECT * FROM articulos');
    // res.json(result);
    res.send('hola desde /api/articulos/all')
};

const createArticle = async (req = request, res = response) => {
   res.send('hola desde crear articulos POST /api/articulos')
};

const getArticle = async (req = request, res = response) => {
     const { id } = req.params;
    // const [result] = await conecction.query('SELECT * FROM articulos WHERE id = ?', [id]);
    // res.json(result);
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