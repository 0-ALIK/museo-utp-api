const { Router } = require('express');
const { getAll } = require('../controllers/carreras');

const router = Router();

// Obtener todos las carreras de la base de datos
router.get('/all', getAll);

module.exports = router;