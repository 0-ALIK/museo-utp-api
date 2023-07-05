const { request, response } = require('express');
const connection = require('../config/connection');
const consulta = require('../helpers/consultas-helper');

const getVisitante = async (req = request, res = response) => {
    const id = req.params.id;
    const [result, metadato] = await connection.query(consulta.visitanteById, [id]);
    res.status(200).json(result);
};

const postVisitante = async (req = request, res = response)=>{
    const estudiante = req.usuarioAuth;
    const articulo = req.params.id;
    const [] = await connection.query(consulta, [estudiante, articulo])
    res.status(201).send("POST de visitante");
}

module.exports = {
    getVisitante,
    postVisitante
}