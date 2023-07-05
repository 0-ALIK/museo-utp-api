const { Router } = require('express');
const { getVisitante, postVisitante } = require('../controllers/visitantes');
const { mostrarErrores, validarJWTMiddleware } = require('../middlewares');


const router = Router();

router.get('/:id', [
    mostrarErrores
], getVisitante);

router.post('/:id', [
    mostrarErrores,
    validarJWTMiddleware
], postVisitante);

module.exports = router;