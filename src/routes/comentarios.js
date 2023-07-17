const { Router } = require('express');
const { getComentById, postComent, deleteComent } = require('../controllers/comentarios');
const { check } = require('express-validator');
const { mostrarErrores, validarJWTMiddleware, validarRol } = require('../middlewares'); 

const router = Router();


router.get('/:id', [
    check('id', 'el id debe ser un número').isNumeric(),
    mostrarErrores
], getComentById);

router.post('/:id', [
    validarJWTMiddleware,
    validarRol('ESTUD'),
    check('comentario', 'comentario es muy pequeño o es muy grande').notEmpty().isLength({min: 2, max: 150}),
    mostrarErrores
], postComent);

router.delete('/:id', [
    validarJWTMiddleware,
    validarRol('ESTUD'),
    check('id', 'el id debe ser un número').isNumeric(),
    mostrarErrores
], deleteComent);


module.exports = router;