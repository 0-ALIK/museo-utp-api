const {Router} = require('express');
const {getAll,getById, postUsuario, putUsuario, deleteUsuario} = require('../controllers/usuarios');
const {validarJWTMiddleware, mostrarErrores} = require('../middlewares/index');

const router = Router();

router.get('/all',getAll);

router.get('/:id',getById);

router.post('/usuarios',postUsuario);

router.put('/Usuarios',[validarJWTMiddleware, mostrarErrores], putUsuario)

router.delete('/:id',[validarJWTMiddleware, mostrarErrores], deleteUsuario)

module.exports = router;