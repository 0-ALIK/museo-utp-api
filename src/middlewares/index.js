const { validationResult } = require('express-validator');

/**
 * Este middleware se 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validarJWTMiddleware = async ( req, res, next ) => {
    const token = req.header('x-token');

    if(!token)
        res.send(401).json({msg: 'no se ha enviado el token'});

    const { usuario, msg } = await validar

    if(!usuario) 
        res.status(401).json({ msg });

    req.usuarioAuth = usuario;

    next();
};

const validarRol = (rol) => {

    return (req, res, next) => {
        const usuario = req.usuarioAuth;

        if(usuario.rol !== rol) {
            res.status(401).json({
                msg: 'los usuarios con rol de tipo '+usuario.rol+' no pueden realizar esta acción'
            });
        }

        next();
    }
}

/**
 * Por defecto los errores que detectan los middlewares de express-validator no se muestran
 * por lo tanto hay que hacerlo manualmente, este middleware se encarga de esto, deben colocarlo
 * siempre como el último middleware.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const mostrarErrores = ( req, res, next ) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()) {
        const errors = validation.array().map(error => {
            return {msg: error.msg};
        });
        return res.status(400).json({errors});
    }

    next();
};

module.exports = {
    validarJWTMiddleware,
    mostrarErrores,
    validarRol
}