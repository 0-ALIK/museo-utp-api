const { Router } = require('express');
const { getAll, postFacultad, deleteFacultad } = require('../controllers/facultades');
const { validarJWTMiddleware, validarRol, mostrarErrores } = require('../middlewares');
const { check } = require('express-validator');

const router = Router();

// Obtener todos las facultades de la base de datos
router.get('/all', getAll);

router.post('/', [
    validarJWTMiddleware,
    validarRol('ADMIN'),
    check('nombre', 'nombre es muy largo o muy corto').notEmpty().isLength({min: 2, max: 200}),
    mostrarErrores
], postFacultad);

router.delete('/:id', [
    validarJWTMiddleware,
    validarRol('ADMIN'),
    check('id', 'id debe ser numérico').isNumeric(),
    mostrarErrores
], deleteFacultad);

module.exports = router;