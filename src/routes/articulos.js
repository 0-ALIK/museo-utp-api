const { Router } = require('express');
const { getAll, getArticle, deleteArticle, editArticle, createArticle } = require('../controllers/articulos');
const { mostrarErrores, validarJWTMiddleware, validarRol } = require('../middlewares');
const { check } = require('express-validator');

const router = Router();

router.get('/all', [
    mostrarErrores,
    check('categoria', 'categoria debe ser un número').isNumeric(),
    check('min', 'min debe ser un número').isNumeric(),
    check('max', 'max debe ser un número').isNumeric(),
], getAll);

router.get('/:id', [
    check('id', 'el id debe ser un número').isNumeric(),
    mostrarErrores
], getArticle);

router.post('/', [
    validarJWTMiddleware, 
    validarRol('ADMIN'),
    check('nombre', 'nombre es muy grande o muy pequeño').notEmpty().isLength({min: 2, max: 120}),
    check('descripcion', 'descripcion es muy grande o muy pequeño').notEmpty().isLength({min: 2, max: 2048}),
    check('categoria_id', 'categoria_id debe ser un número').notEmpty().isNumeric(),
    check('ubicacion', 'ubicacion es muy grande o muy pequeño').notEmpty().isLength({min: 2, max: 255}),
    check('dueno', 'dueno es muy grande o muy pequeño').notEmpty().isLength({min: 2, max: 255}),
    check('year', 'year debe ser un número entero').notEmpty().isNumeric(),
    mostrarErrores
], createArticle);

router.put('/:id', [
    validarJWTMiddleware,
    validarRol('ADMIN'),
    check('id', 'el id debe ser un número').isNumeric(),
    check('nombre', 'nombre es muy grande o muy pequeño').optional().isLength({min: 2, max: 120}),
    check('descripcion', 'descripcion es muy grande o muy pequeño').optional().isLength({min: 2, max: 2048}),
    check('categoria_id', 'categoria_id debe ser un número').optional().isNumeric(),
    check('ubicacion', 'ubicacion es muy grande o muy pequeño').optional().isLength({min: 2, max: 255}),
    check('dueno', 'dueno es muy grande o muy pequeño').optional().isLength({min: 2, max: 255}),
    mostrarErrores
], editArticle);

router.delete('/:id', [
    validarJWTMiddleware, 
    validarRol('ADMIN'),
    check('id', 'el id debe ser un número').isNumeric(),
    mostrarErrores
], deleteArticle);

module.exports = router;
