const { request, response } = require('express');
const connection = require('../config/connection');

const getAll = async (req = request, res = response) => {
    const consulta = 'SELECT * FROM carrera'
    const [ result ] = await connection.query( consulta );
    res.json( result );
};

module.exports = {
    getAll
}