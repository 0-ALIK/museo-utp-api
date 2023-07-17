const { request, response } = require('express');
const connection = require('../config/connection');
const consultas = require('../helpers/consultas-helper');

const getComentById = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        const [ result ] = await connection.query( consultas.getComentariosByAnyWhere + 'WHERE co.articulo_id = ?', [id] );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            msg: 'error al obtener los comentarios del articulo: '+id,
            error
        });
    }
};

const postComent = async (req = request, res = response) => {
    const id = req.params.id;
    const usuario = req.usuarioAuth;
    const comentario = req.body.comentario;

    try {
        await connection.query( consultas.dejarComentarioEnArticulo, [usuario.id, comentario, id] );
        const [ result ] = await connection.query( consultas.getComentariosByAnyWhere + 'WHERE co.id_comentario = LAST_INSERT_ID()' );
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({
            msg: 'error al dejar un comentario en el articulo: '+id+', quizá el articulo no existe',
            error
        });
    }
};

const deleteComent = async (req = request, res = response) => {
    const id = req.params.id;
    const usuario = req.usuarioAuth;

    try {
        const [ result ] = await connection.query( consultas.getComentariosByAnyWhere + 'WHERE co.id_comentario = ?', [id] );
        const [ metadata ] = await connection.query( consultas.borrarComentarioById , [usuario.id, id]);

        if(metadata.affectedRows === 0) {
            return res.status(400).json({msg: 'no se borro el comentario, probablemente porque no pertenece al usuario o no existe'});    
        }
        
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({
            msg: 'error al eliminar comentario del articulo: '+id,
            error
        });
    }
};

module.exports = {
    getComentById,
    postComent,
    deleteComent
};