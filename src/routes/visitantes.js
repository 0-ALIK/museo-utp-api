const { Router } = require('express');
const { getVisitante, postVisitante } = require('../controllers/visitantes');
const { mostrarErrores, validarJWTMiddleware } = require('../middlewares');

const router = Router();

// Ruta GET para obtener información de los visitantes por ID de articulo
router.get('/:id', [
    mostrarErrores // Middleware para mostrar errores en caso de que ocurran
], getVisitante);

// Ruta POST para crear una nueva entrada de visitante
router.post('/:id', [
    mostrarErrores, // Middleware para mostrar errores en caso de que ocurran
    validarJWTMiddleware // Middleware para validar el token JWT
], postVisitante);

module.exports = router;
