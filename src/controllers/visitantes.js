const { request, response } = require('express');
const conecction = require('../config/conecction');

const getbyId = async (req = request, res = response) => {
    const id = req.params.id;
    const consulta = 'SELECT * FROM visitante WHERE articulo_id = ?';
    const [result] = await conecction.query(consulta, [id]);
    res.status(200).json(result);
};

const postVisitante = async (req = request, res = response)=>{
    const estudiante = req.headers; //token, nose como agarrarlo xdd, ni toy seguro de los ids
    const articulo = req.params.id;
    const consulta = 'INSERT INTO visitante (estudiante_id, articulo_id) VALUES(?, ?)'
    const [result] = await conecction.query(consulta, [estudiante, articulo])
    res.status(201).send("POST de visitante");
}

module.exports = {
    getbyId,
    postVisitante
}