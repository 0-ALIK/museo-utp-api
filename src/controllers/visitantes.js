const { request, response } = require('express');
const connection = require('../config/connection');
const consulta = require('../helpers/consultas-helper');

/**
 * Maneja una solicitud GET para obtener información de los visitantes por ID de articulo.
 * @param {Object} req - Objeto de solicitud (request) que contiene los datos de la solicitud.
 * @param {Object} res - Objeto de respuesta (response) utilizado para enviar la respuesta.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la operación está completa.
 */
const getVisitante = async (req = request, res = response) => {
  const id = req.params.id;
  const [resultado, metadato] = await connection.query(consulta.visitanteById, [id]);
  res.status(200).json(resultado);
};

/**
 * Maneja una solicitud POST para crear una nueva entrada de visitante.
 * @param {Object} req - Objeto de solicitud (request) que contiene los datos de la solicitud.
 * @param {Object} res - Objeto de respuesta (response) utilizado para enviar la respuesta.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la operación está completa.
 */
const postVisitante = async (req = request, res = response) => {
  const estudiante = req.usuarioAuth;
  const articulo = req.params.id;
  await connection.query(consulta.insertVisita, [estudiante.id, articulo]);
  const [resultado, metadato] = await connection.query(consulta.getLastVisitante);
  res.status(201).json(resultado);
};

module.exports = {
  getVisitante,
  postVisitante
};
