const { request, response } = require('express');
const connection = require('../config/connection');
const consultas = require('../helpers/consultas-helper');

const getAll = async ( req = request, res = response ) => {
    const consulta = 'SELECT id_facultad as id, nombre FROM facultad';

    try {
        const [ result ] = await connection.query( consulta );
        res.json( result );
    } catch (error) {
        res.status(500).json({
            msg: 'algo salió mal al obtener todas las facultades',
            error
        });
    }
};

const postFacultad = async ( req = request, res = response ) => {
    const nombre = req.body.nombre;

    try {
        await connection.query( consultas.insertFacultad, [nombre] );
        res.status(201).json(true);
    } catch (error) {
        res.status(500).json({
            msg: 'algo salió mal al insertar una nueva facultad: '+nombre,
            error
        });
    }
};

const deleteFacultad = async ( req = request, res = response ) => {
    const id = req.params.id;
    try {
        await connection.query( consultas.borrarFacultad, [id] );
        res.status(200).json(true);
    } catch (error) {
        res.status(500).json({
            msg: 'algo salió mal al borrar una nueva facultad: '+id,
            error
        });
    }
};

module.exports = {
    getAll,
    postFacultad,
    deleteFacultad
}