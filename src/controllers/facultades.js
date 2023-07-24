const { request, response } = require('express');
const connection = require('../config/connection');
const consultas = require('../helpers/consultas-helper');
const { compareSync } = require('bcrypt');

const getAll = async ( req = request, res = response ) => {
    let extras = "";
    let data = []

    if(req.query.query && req.query.query?.length !== 0) {
        extras+="LOWER(nombre) LIKE CONCAT('%', LOWER( ? ), '%') ";
        data.push( req.query.query );
    }

    try {
        if(extras.length !== 0) {
            const [ result ] = await connection.query( consultas.selectFacultad + "WHERE " + extras, data );
            return res.status(200).json(result);
        }

        const [ result ] = await connection.query( consultas.selectFacultad );
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
        const [ metadata ] = await connection.query( consultas.insertFacultad, [nombre] );
        const [ result ] = await connection.query( consultas.selectFacultad + 'WHERE id_facultad = ?', [metadata.insertId]);
        res.status(201).json(result[0]);
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
        const [ result ] = await connection.query( consultas.selectFacultad + 'WHERE id_facultad = ?', [id]);
        const facultad = result[0];
        if(!facultad) {
            return res.status(400).json({msg: 'no existe facultad con id: '+id})
        }
        await connection.query( consultas.borrarFacultad, [id] );
        res.status(200).json(facultad);
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