const { request, response } = require('express');
const connection = require('../config/connection');

const getAll = async ( req = request, res = response ) => {
    const consulta = 'SELECT * FROM facultad';

    try {
        const [ result ] = await connection.query( consulta );
        res.json( result );
    } catch (error) {
        res.status(500).json({
            msg: 'algo salió mal al obtener todas las facultades'
        })
    }
};

module.exports = {
    getAll
}