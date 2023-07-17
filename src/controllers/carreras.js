const { request, response } = require('express');
const connection = require('../config/connection');

const getAll = async (req = request, res = response) => {
    const consulta = 'SELECT * FROM carrera'
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
    const consulta = 'SELECT * FROM carrera WHERE facultad_id = ?'

    try {
        
        const [ result ] = await connection.query( consulta, [id] );

        res.status(200).json( result );

    } catch (error) {
        res.status(500).json({
            msg: 'algo ha salido mal al obtener las carreras de la facultad id: '+id,
            error
        })
    }
};

module.exports = {
    getAll,
    getById
}