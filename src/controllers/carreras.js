const { request, response } = require('express');
const connection = require('../config/connection');
const consultas = require('../helpers/consultas-helper');

const getAll = async (req = request, res = response) => {
    const consulta = 'SELECT id_carrera as id, nombre, facultad_id FROM carrera'
    try {
        const [ result ] = await connection.query( consulta );
        res.json( result );
        
    } catch (error) {
        res.status(500).json({
            msg: 'algo ha salido mal al obtener las carreras',
            error
        })
    }
};

const getById = async (req = request, res = response) => {
    const id = req.params.id;
    const consulta = 'SELECT id_carrera as id, nombre, facultad_id FROM carrera WHERE facultad_id = ?'

    try {
        
        const [ result ] = await connection.query( consulta, [id] );

        res.status(200).json( result );

    } catch (error) {
        res.status(500).json({
            msg: 'algo ha salido mal al obtener las carreras de la facultad id: '+id,
            error
        });
    }
};

const postCarrera = async ( req = request, res = response ) => {
    const { nombre, facultad_id } = req.body;

    try {

        await connection.query( consultas.insertCarrera, [facultad_id, nombre] );
        res.status(201).json(true);
    } catch (error) {
        res.status(500).json({
            msg: 'algo salió mal al insertar la nueva carrera',
            body: req.body,
            error
        });
    }
};

const deleteCarrera = async ( req = request, res = response ) => {
    const id = req.params.id;

    try {
        await connection.query( consultas.borrarCarrera, [id] );
        res.status(200).json(true);
    } catch (error) {
        res.status(500).json({
            msg: 'algo salió mal al insertar una nueva carrera: '+id,
            error
        });
    }
};

module.exports = {
    getAll,
    getById,
    postCarrera,
    deleteCarrera
}