const { request, response } = require('express');
const connection = require('../config/connection');
const consultas = require('../helpers/consultas-helper');
const { compareSync } = require('bcrypt');
const { generarJWT } = require('../helpers/jwt-helpers');

const login = async (req = request, res = response) => {

    const { nombre_usuario, password } = req.body; 

    const [ result ] = await connection.query( consultas.usuarioByAnyWhere + 'WHERE nombre_usuario = ?', [nombre_usuario]);
    const usuario = result[0];

    const isPassCorrect = compareSync( password, usuario.password || '' );

    if(!usuario || !isPassCorrect) {
        return res.status(400).json({msg: 'el correo / contraseña no son validos'});
    }

    const token = await generarJWT( usuario.id );

    if(usuario.rol === 'estud') {
        const [ result2 ] = connection.query( consultas.estudianteById + 'WHERE es.usuario_id = ?', [usuario.id] );

        usuario.id = result2[0].id;
        usuario.nivel = result2[0].nivel;
        usuario.carrera = result2[0].carrera;
        usuario.facultad = result2[0].facultad;
        usuario.facultad = result2[0].nombre;
        usuario.facultad = result2[0].apellido;
        usuario.facultad = result2[0].cedula;
        usuario.facultad = result2[0].nivel;
        usuario.facultad = result2[0].foto;    
    }

    res.status(200).json({
        token,
        usuario
    });

};

module.exports = {
    login
};