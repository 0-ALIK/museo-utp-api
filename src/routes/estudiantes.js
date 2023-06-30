const { Router } = require('express');
const { getAll, getbyId, dlbyId, postEstudiante, putbyId } = require('../controllers/estudiantes')

const router = Router();

router.get('/all', getAll);

router.get('/:id', getbyId);

router.put('/modificar/:id', putbyId);

router.post('/agregar',postEstudiante);

router.delete('/:id', dlbyId);

module.exports = router;