//Librerias (Express, Controladores, Middlewares)
const {Router} = require('express');
const {getAll,getById, postUsuario, putUsuario, deleteUsuario} = require('../controllers/usuarios');
const {validarJWTMiddleware, mostrarErrores} = require('../middlewares/index');

const router = Router();

//Ruta para devolver todos los usuarios
router.get('/all',getAll);

//Ruta para devolver un usuarios
router.get('/:id',getById);

//Ruta para postear un usuario
router.post('/usuarios',postUsuario);

//Ruta para modificar un usuario
router.put('/Usuarios',[validarJWTMiddleware, mostrarErrores], putUsuario)

//Ruta para eliminar un usuario
router.delete('/:id',[validarJWTMiddleware, mostrarErrores], deleteUsuario)

module.exports = router;