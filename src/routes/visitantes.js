const { Router } = require('express');
const { getbyId, postVisitante } = require('../controllers/visitantes');

const router = Router();

router.get('/:id', [
    //Middlewares
], getbyId);

router.post('/:id', [
    //Middlewares
], postVisitante);

module.exports = router;