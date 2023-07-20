const { Router } = require('express');
const { getAll, getById, postCarrera, deleteCarrera } = require('../controllers/carreras');
const { mostrarErrores, validarJWTMiddleware, validarRol } = require('../middlewares');
const { check } = require('express-validator');

const router = Router();

// Obtener todos las carreras de la base de datos
router.get('/all', getAll);

router.get('/facultad/:id', [
    check('id', 'id debe ser numérico').isNumeric(),
    mostrarErrores
], getById)

router.post('/', [
    validarJWTMiddleware,
    validarRol('ADMIN'),
    check('nombre', 'nombre es muy largo o muy corto').notEmpty().isLength({min: 2, max: 200}),
    check('facultad_id', 'facultad_id debe ser numérico').notEmpty().isNumeric(),
    mostrarErrores
], postCarrera);

router.delete('/:id', [
    validarJWTMiddleware,
    validarRol('ADMIN'),
    check('id', 'id debe ser numérico').isNumeric(),
    mostrarErrores
], deleteCarrera);

module.exports = router;