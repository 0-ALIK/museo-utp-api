const jwt = require('jsonwebtoken');
const connection = require('../config/connection');
const consultas = require('./consultas-helper');
const { JWT_SECRET } = process.env;

/**
 * Genera un nuevo jwt de sesión para un usuario a partir de su id
 * @param {*} id 
 * @returns 
 */
const generarJWT = ( id = '' ) => {

    return new Promise( (resolve, reject) => {
        
        const payload = { id };

        jwt.sign( payload, JWT_SECRET, {
            expiresIn: '24h'
        }, (error, token) => {
            if(error) {
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
};

/**
 * Se encarga de validar el jwt del usuario para saber si es valido
 * @param {*} token Es el jwt del usuario
 * @returns Un objeto con la información de la validación
 */
const validarJWT = async (token = '') => {
    try {
        const { id } = jwt.verify( token, JWT_SECRET );

        const [ result ] = connection.query( consultas.usuarioByAnyWhere + 'WHERE id_usuario = ?', [id] );

        const usuario = result[0]; 

        if(!usuario) {
            return {msg: 'usuario no existe'}
        }

        if(usuario.rol === 'ESTUD') {
        
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

        return { usuario };

    } catch (error) {
        return {msg: 'token no valido'};
    }
};

module.exports = {
    generarJWT,
    validarJWT
};