const { Router } = require('express');
const { getAll } = require('../controllers/participantes');
const { check } = require('express-validator');

const router = Router();

router.get('/all', getAll);

module.exports = router;