//Librerias (Express, Controladores)
const {Router} = require('express');
const {getAll,getById, postUsuario, putUsuario, deleteUsuario} = require('../controllers/usuarios');
const { check } = require('express-validator');
const { mostrarErrores, validarJWTMiddleware, validarRol } = require('../middlewares');
const { nameRegExp, existeNombreUsuario, existeCedula, cedulaRegExp } = require('../helpers/database-helpers');

const router = Router();

//Ruta para devolver todos los usuarios
router.get('/all', getAll);

//Ruta para devolver un usuarios
router.get('/:id', [
    check('id', 'el id debe ser un número').isNumeric(),
    mostrarErrores
], getById);

//Ruta para postear un usuario
router.post('/',[
    check('nombre_usuario', 'nombre_usuario no puede estar nulo').notEmpty(),
    check('nombre_usuario', 'nombre_usuario es muy largo o muy corto').isLength({min: 2, max: 32}),
    check('nombre_usuario', 'nombre_usuario no tiene un formato valido').matches( nameRegExp ),
    check('nombre_usuario').custom( existeNombreUsuario ),
    check('password', 'password no puede estar nulo').notEmpty(),
    check('password', 'password es muy largo o muy corto').isLength({min: 8, max: 16}),
    check('nombre', 'nombre no puede estar nulo').notEmpty(),
    check('nombre', 'nombre es muy largo o muy corto').isLength({min: 2, max: 30}),
    check('apellido', 'apellido no puede estar nulo').notEmpty(),
    check('apellido', 'apellido es muy largo o muy corto').isLength({min: 2, max: 30}),
    check('cedula', 'cedula no puede estar nulo').notEmpty(),
    check('cedula').custom( existeCedula ),
    check('cedula', 'cedula no tiene formato valido').matches( cedulaRegExp ),
    check('nivel', 'nivel no puede estar nulo y debe ser un número').notEmpty().isNumeric(),
    check('id_facultad', 'id_facultad no puede estar nulo y debe ser un número').notEmpty().isNumeric(),
    check('id_carrera', 'id_carrera no puede estar nulo y debe ser un número').notEmpty().isNumeric(),
    mostrarErrores
],postUsuario);

//Ruta para modificar un usuario
router.put('/', [
    validarJWTMiddleware,
    check('nombre', 'nombre es muy largo o muy corto').optional().isLength({min: 2, max: 30}),
    check('apellido', 'apellido es muy largo o muy corto').optional().isLength({min: 2, max: 30}),
    check('nivel', 'nivel no puede estar nulo y debe ser un número').optional().isNumeric(),
    check('id_facultad', 'el id_facultad debe ser un número').optional().isNumeric(),
    check('id_carrera', 'el id_carrera debe ser un número').optional().isNumeric(),
    check('cedula', 'cedula no tiene formato valido').optional().matches( cedulaRegExp ),
    check('cedula').optional().custom( existeCedula ),
    check('nivel', 'el nivel debe ser un número').optional().isNumeric(),
    mostrarErrores
], putUsuario)

//Ruta para eliminar un usuario
router.delete('/:id', [
    validarJWTMiddleware,
    validarRol('ADMIN'),
    check('id', 'el id debe ser un número').notEmpty().isNumeric(),
    mostrarErrores
], deleteUsuario)

module.exports = router;