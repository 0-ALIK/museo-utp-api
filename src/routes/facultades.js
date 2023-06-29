const { Router } = require('express');
const { getAll } = require('../controllers/facultades');

const router = Router();

router.get('/all', getAll);

module.exports = router;