const { Router } = require('express');
const { getVisitante, postVisitante } = require('../controllers/visitantes');
const { mostrarErrores, validarJWTMiddleware, validarRol } = require('../middlewares');
const { check } = require('express-validator/src');

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
    validarJWTMiddleware,
    validarRol('ADMIN'),
    check('id', 'el id debe ser un número').isNumeric(),
    mostrarErrores 
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
    validarJWTMiddleware,
    validarRol('ESTUD'),
    check('id', 'el id debe ser un número').isNumeric(),
    mostrarErrores
], postVisitante);

module.exports = router;
