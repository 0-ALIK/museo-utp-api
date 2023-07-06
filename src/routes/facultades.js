const { Router } = require('express');
const { getAll } = require('../controllers/facultades');

const router = Router();

// Obtener todos las facultades de la base de datos
router.get('/all', getAll);

module.exports = router;