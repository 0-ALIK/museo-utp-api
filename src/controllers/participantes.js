const { request, response } = require('express');
const connection = require('../config/connection');

const getAll = async (req = request, res = response) => {
    const consulta = "SELECT * FROM participantes";

    try {
        let extras = "";
        let data = []

        if(req.query.departamento && req.query.departamento?.length !== 0) {
            extras+="departamento = ?"
            data.push( req.query.departamento );
        }

        if(extras.length !== 0) {
            const [ result ] = await connection.query( consulta + " WHERE " + extras, data );    
            return res.status(200).json(result);
        }

        const [result] = await connection.query( consulta );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            msg: 'algo salio mal al obtener a los participantes',
            error
        })
    }
};


module.exports = {
    getAll
};