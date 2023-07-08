const { Router } = require('express');
const { getVisitante, postVisitante } = require('../controllers/visitantes');
const { mostrarErrores, validarJWTMiddleware } = require('../middlewares');

/**
 * Router para las operaciones relacionadas con los visitantes.
 * @type {Router}
 */
const router = Router();

/**
 * Ruta GET para obtener información de los visitantes por ID del articulo.
 * @name /visitantes/:id
 * @function
 * @param {string} '/:id' - Ruta que recibe un parámetro ID.
 * @param {Function[]} middleware - Array de middlewares que se ejecutan antes de la función de manejo.
 * @param {Function} getVisitante - Función de manejo que obtiene información del visitante.
 */
router.get('/:id', [
    mostrarErrores // Middleware para mostrar errores en caso de que ocurran
], getVisitante);

/**
 * Ruta POST para crear una nueva entrada de visitante.
 * @name /visitantes/:id
 * @function
 * @param {string} '/:id' - Ruta que recibe un parámetro ID.
 * @param {Function[]} middleware - Array de middlewares que se ejecutan antes de la función de manejo.
 * @param {Function} postVisitante - Función de manejo que crea una nueva entrada de visitante.
 */
router.post('/:id', [
    mostrarErrores, // Middleware para mostrar errores en caso de que ocurran
    validarJWTMiddleware // Middleware para validar el token JWT
], postVisitante);

module.exports = router;
