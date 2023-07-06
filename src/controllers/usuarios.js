const {response, request} = require('express');
const connection = require('../config/connection');
const consultas = require('../helpers/consultas-helper');
const {validarJWT} = require('../helpers/jwt-helpers');
const bcrypt = require('bcrypt');

const getAll = async (req = request, res = response) =>{
    const [result] = await connection.query(consultas.usuarioByAnyWhere);
    res.json(result);
}

const getById = async (req = request, res = response) =>{
    const id = req.params.id;
    const [result] = await connection.query(consultas.usuarioByAnyWhere + 'WHERE id_usuario = ?', id);
    res.json(result);
}

const postUsuario = async (req = request, res = response) => { 
    const {nombreUsuario, contraseñaUsuario, rol, nombre, apellido, } = req.body;

    //hasheo de contraseña que sera almacenada en la base de datos
    const hashPassword = bcrypt.hash(contraseñaUsuario,10);

    const [result] = await connection.query(consultas.postUsuario, [nombreUsuario, hashPassword, rol])
    const usuario = result[0];

    //En caso de ser estudiante se almacenan los datos, sino, no entraria en el query de insertar estudiante;
    if(usuario.rol === 'estud'){
        const {nombre, apellido, cedula, nivel, id_facultad, id_carrera, foto} = req.body;

        const [result2] = await connection.query(consultas.postEsudiante,[nombre, apellido, cedula, nivel, id_facultad, id_carrera, foto]);
        
        usuario.nombre = result2[0].nombre;
        usuario.apellido = result2[0].apellido;
        usuario.cedula = result2[0].cedula;
        usuario.nivel = result2[0].nivel;
        usuario.facultad = result2[0].facultad;
        usuario.carrera = result2[0].carrera;
        usuario.foto = result2[0].foto;
     }
     res.status(201).json(usuario)
}

const putUsuario = async (req = request, res = response) =>{
    const tokenUser = req.header('x-token');
    const usuario = await validarJWT(tokenUser);

    if(!usuario){
        return res.status(404).json('No se encontro el usuario');
    }
    // contrasena, rol. No deberian ir?
    const {usuarioNombre, nombre, apellido,  cedula, nivel, id_facultad, id_carrera, foto} = req.body; 

    const [result] = await connection.query(consultas.putUsuario + 'WHERE id_usuario = ?',[usuarioNombre, usuario.id])

    res.status(202).json('Usuario Actualizado');
}

//TODO: por hacer
const deleteUsuario = async (req = request, res = response) =>{

}

module.exports = {
    getAll,
    getById,
    postUsuario,
    putUsuario,
    deleteUsuario
};