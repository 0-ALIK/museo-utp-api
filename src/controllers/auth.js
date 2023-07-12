const { request, response } = require('express');
const connection = require('../config/connection');
const consultas = require('../helpers/consultas-helper');
const { compareSync } = require('bcrypt');
const { generarJWT } = require('../helpers/jwt-helpers');
const { agregarDatosEstudiante } = require('../helpers/database-helpers');

const login = async (req = request, res = response) => {

    const { nombre_usuario, password } = req.body; 

    try {
        
        
        const [ resultUsuario ] = await connection.query( consultas.usuarioByAnyWhere + 'WHERE nombre_usuario = ?', [nombre_usuario]);
        const usuario = resultUsuario[0];

        const isPassCorrect = compareSync( password, usuario.password || '' );

        if(!usuario || !isPassCorrect) {
            return res.status(400).json({msg: 'el correo / contraseña no son validos'});
        }

        const token = await generarJWT( usuario.id );

        if(usuario.rol === 'ESTUD') {

            const [ resultEstud ] = connection.query( consultas.estudianteById + 'WHERE es.usuario_id = ?', [usuario.id] );
            agregarDatosEstudiante( usuario, resultEstud );
        }

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
    login
};