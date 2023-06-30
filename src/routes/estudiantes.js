const { Router } = require('express');
const { getAll, dlbyId, postEstudiante, putbyId } = require('../controllers/estudiantes')

const router = Router();

router.get('/all', getAll);

router.get('/:id', (req, res)=>{
    getbyId(req.params.id));
};

router.put('/modificar/:id', (req, res) =>{
    putbyId(req.params.id);
});

router.post('/agregar',(req, res) => {
    postEstudiante();
});

router.delete('/:id', (req, res)=>{
    dlbyId(req.params.id);
});

module.exports = router;