const { Router } = require('express');
const { login, auth } = require('../controllers/auth');
const { check } = require('express-validator');
const { mostrarErrores, validarJWTMiddleware } = require('../middlewares');

const router = Router();

router.get('/', [
    validarJWTMiddleware
], auth);

router.post('/login', [
    check('nombre_usuario', 'el nombre de usuario es obligatorio').notEmpty(),
    check('password', 'la contraseña es obligatoria').notEmpty(),
    mostrarErrores
], login);

module.exports = router;