const { request, response } = require('express');
const connection = require('../config/connection');
const consultas = require('../helpers/consultas-helper');
const { body } = require('express-validator');

const getAll = async (req = request, res = response) => {
    let extras = "";
    let data = []

    if(req.query.query && req.query.query?.length !== 0) {
        extras+="LOWER(ca.nombre) LIKE CONCAT('%', LOWER( ? ), '%') ";
        data.push( req.query.query );
    }

    try {
        if(extras.length !== 0) {
            const [ result ] = await connection.query( consultas.selectCarrera + "WHERE " + extras, data );
            return res.status(200).json(result);
        }

        const [ result ] = await connection.query( consultas.selectCarrera );
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

    try {
        
        const [ result ] = await connection.query( consultas.selectCarrera + 'WHERE facultad_id = ?', [id] );

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

        const [ metadata ] = await connection.query( consultas.insertCarrera, [facultad_id, nombre] );
        const [ result ] = await connection.query( consultas.selectCarrera + 'WHERE id_carrera = ?', [metadata.insertId] )
        res.status(201).json(result[0]);
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
        const [ result ] = await connection.query( consultas.selectCarrera + 'WHERE id_carrera = ?', [id] )
        const carrera = result[0];
        if(!carrera) {
            return res.status(400).json({msg: 'no existe carrera con id: '+id})
        }

        await connection.query( consultas.borrarCarrera, [id] );
        res.status(200).json(carrera);
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