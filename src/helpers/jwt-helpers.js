const jwt = require('jsonwebtoken');
const connection = require('../config/connection');
const consultas = require('./consultas-helper');
const { agregarDatosEstudiante } = require('./database-helpers');
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

        const [ resultUsuario ] = connection.query( consultas.usuarioByAnyWhere + 'WHERE id_usuario = ?', [id] );

        const usuario = resultUsuario[0]; 

        if(!usuario) {
            return {msg: 'usuario no existe'}
        }

        if(usuario.rol === 'ESTUD') {
        
            const [ resultEstud ] = connection.query( consultas.estudianteByAnyWhere + 'WHERE es.usuario_id = ?', [usuario.id] );
            agregarDatosEstudiante(usuario, resultEstud);
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