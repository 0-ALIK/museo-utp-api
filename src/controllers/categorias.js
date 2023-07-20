const { request, response } = require('express');
const connection = require('../config/connection');

const getAll = async (req = request, res = response) => {
    const consulta = 'SELECT id_categoria as id, nombre FROM categoria';

    try {
        const [ categorias ] = await connection.query( consulta );
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({
            msg: 'algo salio mal al obtener todas las categorias',
            error
        });
    }
};

const postCategoria = async (req = request, res = response) => {
    const consulta = 'INSERT INTO categoria (nombre) VALUES (?)';
    const nombre = req.body.nombre;

    try {
        await connection.query( consulta, [nombre] );
        res.status(201).json(true);
    } catch (error) {
        res.status(500).json({
            msg: 'algo salio mal al insertar una categoria: '+nombre,
            error
        });
    }
};

const deleteCategoria = async (req = request, res = response) => {
    const consulta = 'DELETE FROM categoria WHERE id_categoria = ?';
    const id = req.params.id;

    try {
        await connection.query( consulta, [id] );
        res.status(200).json(true);
    } catch (error) {
        res.status(500).json({
            msg: 'algo salio mal al borrar una categoria: '+id,
            error
        });
    }
};

module.exports = {
    getAll,
    postCategoria,
    deleteCategoria
}; 