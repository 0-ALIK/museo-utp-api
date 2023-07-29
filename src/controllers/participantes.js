const { request, response } = require('express');
const connection = require('../config/connection');

const getAll = async (req = request, res = response) => {
    const consulta = `
    SELECT 
        pa.id_participante as id, 
        pa.nombre,
        pa.apellido,
        pa.foto,
        r.nombre as rol,
        de.nombre as departamento
    FROM participante AS pa
    JOIN roles_participante AS prd
    ON prd.participante_id = pa.id_participante
    JOIN roles as r
    ON prd.rol_id = r.id_rol
    JOIN departamento as de
    ON prd.departamento_id = de.id_departamento `;

    try {
        let extras = "";
        let data = []

        if(req.query.departamento && req.query.departamento?.length !== 0) {
            extras+="de.nombre = ?"
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