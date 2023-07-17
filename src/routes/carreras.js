const { Router } = require('express');
const { getAll, getById } = require('../controllers/carreras');
const { mostrarErrores } = require('../middlewares');
const { check } = require('express-validator');

const router = Router();

// Obtener todos las carreras de la base de datos
router.get('/all', getAll);

router.get('/allbyfac/:id', [
    check('id', 'id debe ser numérico').isNumeric(),
    mostrarErrores
], getById)

module.exports = router;