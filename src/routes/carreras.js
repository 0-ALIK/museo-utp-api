const { Router } = require('express');
const { getAll } = require('../controllers/carreras');

const router = Router();

router.get('/all', getAll);

module.exports = router;