const { request, response } = require('express');
const connection = require('../config/connection');

const getAll = async (req = request, res = response) => {
    const consulta = 'SELECT id_categoria as id, nombre FROM categoria ';

    let extras = "";
    let data = []

    if(req.query.query && req.query.query?.length !== 0) {
        extras+="LOWER(nombre) LIKE CONCAT('%', LOWER( ? ), '%') ";
        data.push( req.query.query );
    }

    try {
        if(extras.length !== 0) {
            const [ result ] = await connection.query( consulta + "WHERE " + extras, data );
            return res.status(200).json(result);
        }

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
    const consultaSelect = 'SELECT id_categoria as id, nombre FROM categoria ';
    const consulta = 'INSERT INTO categoria (nombre) VALUES (?)';
    const nombre = req.body.nombre;

    try {
        const [ metadata ] = await connection.query( consulta, [nombre] );
        const [result ] = await connection.query(consultaSelect + 'WHERE id_categoria = ?', [metadata.insertId]);
        res.status(201).json(result[0]);
    } catch (error) {
        res.status(500).json({
            msg: 'algo salio mal al insertar una categoria: '+nombre,
            error
        });
    }
};

const deleteCategoria = async (req = request, res = response) => {
    const consultaSelect = 'SELECT id_categoria as id, nombre FROM categoria ';
    const consulta = 'DELETE FROM categoria WHERE id_categoria = ?';
    const id = req.params.id;

    try {
        const [ result ] = await connection.query( consultaSelect + 'WHERE id_categoria = ?', [id] )
        const categoria = result[0];
        if(!categoria) {
            return res.status(400).json({msg: 'no existe categoria con id: '+id})
        }

        await connection.query( consulta, [id] );
        res.status(200).json(categoria);
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