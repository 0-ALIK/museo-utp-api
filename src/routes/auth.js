const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { mostrarErrores } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('nombre_usuario', 'el nombre de usuario es obligatorio').notEmpty(),
    check('password', 'la contraseña es obligatoria').notEmpty(),
    mostrarErrores
], login);

module.exports = router;