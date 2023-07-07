const { request, response } = require('express');
const connection = require('../config/connection');
const consulta = require('../helpers/consultas-helper');

// Maneja una solicitud GET para recuperar información del visitante basada en un parámetro de ID
const getVisitante = async (req = request, res = response) => {
  const id = req.params.id; // Extrae el parámetro ID de la solicitud
  const [resultado, metadato] = await connection.query(consulta.visitanteById, [id]); // Ejecuta una consulta SQL para recuperar la información del visitante
  res.status(200).json(resultado); // Envía el resultado como una respuesta JSON con un código de estado 200 (OK)
};

// Maneja una solicitud POST para crear una nueva entrada de visitante
const postVisitante = async (req = request, res = response) => {
  const estudiante = req.usuarioAuth; // Obtiene el usuario autenticado de la solicitud
  const articulo = req.params.id; // Extrae el ID del artículo de la solicitud
  await connection.query(consulta.insertVisita, [estudiante.id, articulo]); // Ejecuta una consulta SQL para insertar los datos de la visita en la base de datos
  const [resultado, metadato] = await connection.query(consulta.getLastVisitante); // Ejecuta una consulta SQL para recuperar la última entrada del visitante
  res.status(201).json(resultado); // Envía el resultado como una respuesta JSON con un código de estado 201 (Creado)
};

module.exports = {
  getVisitante,
  postVisitante
};
