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
	
	try {
		const [ resultado ] = await connection.query(consulta.visitanteById, [id]);
		res.status(200).json(resultado);
	} catch (error) {
		res.status(500).json({
		msg: 'no se puedo obtener todos los visitantes del artículo con id: '+id,
		error
		});
	}
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
	const query = 'SELECT * FROM visitante WHERE id_visitante = ?'

	try {

		const [ metadata ] = await connection.query(consulta.insertVisita, [estudiante.id, articulo]);
		const id = metadata.insertId; 
		const [resultado] = await connection.query( query, [id] );
		res.status(201).json(resultado[0]);

	} catch (error) {
		res.status(500).json({
		msg: 'no se pudo realizar el registro de la nueva vista, quizá se deba a que el estudiante: '+estudiante.nombre+' ya visito este artículo'
		});
	}

};

module.exports = {
	getVisitante,
	postVisitante
};
