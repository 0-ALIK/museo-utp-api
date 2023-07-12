//Librerias (Express, Controladores)
const {Router} = require('express');
const {getAll,getById, postUsuario, putUsuario, deleteUsuario} = require('../controllers/usuarios');
const { check } = require('express-validator');
const { mostrarErrores, validarJWTMiddleware, validarRol } = require('../middlewares');

const router = Router();

//Ruta para devolver todos los usuarios
router.get('/all', getAll);

//Ruta para devolver un usuarios
router.get('/:id', [
    check('id', 'el id debe ser un número').isNumeric()
], getById);

//Ruta para postear un usuario
router.post('/',[
    check('nombre_usuario', 'nombre_usuario no puede estar nulo').notEmpty(),
    check('password', 'password no puede estar nulo').notEmpty(),
    check('nombre', 'nombre no puede estar nulo').notEmpty(),
    check('apellido', 'apellido no puede estar nulo').notEmpty(),
    check('cedula', 'cedula no puede estar nulo').notEmpty(),
    check('nivel', 'nivel no puede estar nulo y debe ser un número').notEmpty().isNumeric(),
    check('id_facultad', 'id_facultad no puede estar nulo y debe ser un número').notEmpty().isNumeric(),
    check('id_carrera', 'id_carrera no puede estar nulo y debe ser un número').notEmpty().isNumeric(),
    mostrarErrores
],postUsuario);

//Ruta para modificar un usuario
router.put('/', [
    validarJWTMiddleware,
    validarRol('ESTUD'),
    check('id_facultad', 'el id_facultad debe ser un número').optional().isNumeric(),
    check('id_carrera', 'el id_carrera debe ser un número').optional().isNumeric(),
    check('nivel', 'el nivel debe ser un número').optional().isNumeric(),
    mostrarErrores
],putUsuario)

//Ruta para eliminar un usuario
router.delete('/:id', [
    validarJWTMiddleware,
    validarRol('ADMIN'),
    check('id', 'el id debe ser un número').isNumeric(),
    mostrarErrores
], deleteUsuario)

module.exports = router;