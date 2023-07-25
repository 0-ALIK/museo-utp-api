const { request, response } = require('express');
const connection = require('../config/connection');
const consultas = require('../helpers/consultas-helper');
const { compareSync } = require('bcrypt');
const { generarJWT } = require('../helpers/jwt-helpers');
const { agregarDatosEstudiante } = require('../helpers/database-helpers');

const auth = async (req = request, res = response) => {
    try {
        
        res.status(200).json( req.usuarioAuth )

    } catch (error) {
        res.status(500).json({msg: 'algo salio mal al validar tu sesión'})
    }
};

const login = async (req = request, res = response) => {

    const { nombre_usuario, password } = req.body; 

    try {
        
        const [ resultUsuario ] = await connection.query( consultas.usuarioByAnyWhere + 'WHERE nombre_usuario = ?', [nombre_usuario]);
        const usuario = resultUsuario[0];

        const isPassCorrect = compareSync( password, usuario.password || '' );

        if(!usuario || !isPassCorrect) {
            return res.status(400).json({msg: 'el nombre_usuario / contraseña no son validos'});
        }

        const token = await generarJWT( usuario.id );

        const [ resultEstud ] = await connection.query( consultas.estudianteByAnyWhere + 'WHERE es.usuario_id = ?', [usuario.id] );
        agregarDatosEstudiante( usuario, resultEstud );

        delete usuario.password;

        res.status(200).json({
            token,
            usuario
        });

    } catch (error) {
        res.status(500).json({
            msg: 'algo salio mal al hacer el login',
            body: req.body,
            error
        });
    }
    
};

module.exports = {
    login,
    auth
};