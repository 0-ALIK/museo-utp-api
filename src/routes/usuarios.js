//Librerias (Express, Controladores)
const {Router} = require('express');
const {getAll,getById, postUsuario, putUsuario, deleteUsuario} = require('../controllers/usuarios');
const { check } = require('express-validator');

const router = Router();

//Ruta para devolver todos los usuarios
router.get('/all',getAll);

//Ruta para devolver un usuarios
router.get('/:id',getById);

//Ruta para postear un usuario
router.post('/usuarios',[
    check('nombre_usuario', 'No puede estar nulo').notEmpty(),
    check('password', 'No puede estar nulo').notEmpty(),
    check('nombre', 'No puede estar nulo').notEmpty(),
    check('apellido', 'No puede estar nulo').notEmpty(),
    check('cedula', 'No puede estar nulo').notEmpty(),
    check('nivel', 'No puede estar nulo').notEmpty(),
    check('id_facultad', 'No puede estar nulo').notEmpty(),
    check('id_carrera', 'No puede estar nulo').notEmpty(),
    mostrarErrores
],postUsuario);

//Ruta para modificar un usuario
router.put('/usuarios', putUsuario)

//Ruta para eliminar un usuario
router.delete('/:id', deleteUsuario)

module.exports = router;