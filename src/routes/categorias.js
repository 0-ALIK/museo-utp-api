const { Router } = require('express');
const { getAll, postCategoria, deleteCategoria } = require('../controllers/categorias');
const { validarJWTMiddleware, validarRol, mostrarErrores } = require('../middlewares');
const { check } = require('express-validator');

const router = Router();

router.get('/all', getAll);

router.post('/', [
    validarJWTMiddleware,
    validarRol('ADMIN'),
    check('nombre', 'nombre es muy corto o muy largo').notEmpty().isLength({min: 2, max: 60}),
    mostrarErrores
], postCategoria);

router.delete('/:id', [
    validarJWTMiddleware,
    validarRol('ADMIN'),
    check('id', 'el id debe ser un número').isNumeric(),
    mostrarErrores
], deleteCategoria);

module.exports = router;