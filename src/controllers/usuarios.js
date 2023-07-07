//Librerias (Express, Connection, consultas-helper, jwt-helpers, bcrypt)
const {response, request} = require('express');
const connection = require('../config/connection');
const consultas = require('../helpers/consultas-helper');
const {validarJWT} = require('../helpers/jwt-helpers');
const bcrypt = require('bcrypt');

//Mostrar todos los usuario
const getAll = async (req = request, res = response) =>{
    
    //consulta de todos los estudiantes
    const [result] = await connection.query(consultas.usuarioByAnyWhere);
    res.status(200).json(result);
}

//Mostrar un usuario en base a su ID
const getById = async (req = request, res = response) =>{
    const id = req.params.id;

    //consulta de un usuario segun ID
    const [result] = await connection.query(consultas.usuarioByAnyWhere + 'WHERE id_usuario = ?', [id]);
    res.status(200).json(result);
}

//postear un usuario
const postUsuario = async (req = request, res = response) => {

    const {nombre_usuario, password, nombre, apellido, nombre, apellido, cedula, nivel, id_facultad, id_carrera, foto} = req.body;

    //Hasheo de contrasena que sera almacenada en la base de datos
    const salt = bcrypt.genSaltSync()
    const hashPassword = bcrypt.hashSync(password, salt);

    //Query para postear los datos de un usuario
    await connection.query(consultas.postUsuario, [nombre_usuario, hashPassword])

    //Query para consultar los datos de un usuario
    const [result] = connection.query(consultas.usuarioByAnyWhere + 'WHERE id_usuario = LAST_INSERT_ID()');
    const usuario = result[0];

    //Query para postear los datos de un estudiante
    await connection.query(consultas.postEstudiante,[nombre, apellido, cedula, nivel, id_facultad, id_carrera, foto]);

    //Query para consultar los datos de un estudiante
    const [result2] = connection.query(consultas.estudianteByAnyWhere + 'WHERE id_usuario = LAST_INSERT_ID()');

    usuario.nombre = result2[0].nombre;
    usuario.apellido = result2[0].apellido;
    usuario.cedula = result2[0].cedula;
    usuario.nivel = result2[0].nivel;
    usuario.facultad = result2[0].facultad;
    usuario.carrera = result2[0].carrera;
    usuario.foto = result2[0].foto;

     res.status(201).json(usuario)
}

//Modificar datos de un usuario
const putUsuario = async (req = request, res = response) =>{

    // datos extraidos por el req.usuarioAuth
    const usuario = req.usuarioAuth;

    // datos extraidos por el req.body
    const {usuarioNombre, nombre, apellido,  cedula, nivel, id_facultad, id_carrera, foto} = req.body; 

    //Verificar que el usuario no este vacio
    if(!usuario){
        return res.status(404).json({
            mensaje: 'Error: No se encontro el usuario'
        })
    }

    //Query para postear un usuario
    await connection.query(consultas.putUsuario + 'WHERE id_usuario = ?',[usuarioNombre, usuario.id])
    const [result] = connection.query(consultas.usuarioByAnyWhere + 'WHERE id_usuario = ?', [usuario.id]);

    res.status(202).json({
        mensaje: 'Usuario Actualizado'
    });
}

//Eliminar un usuario
const deleteUsuario = async (req = request, res = response) =>{
    const usuario = req.usuarioAuth;

    //Verificar que el usuario no este vacio
    if(!usuario){
        return res.status(404).json({
            mensaje: 'Error: No se encontro el usuario'
        })
    }

    //Query para consultar los datos de un usuario
    const [result] = connection.query(consultas.usuarioByAnyWhere + 'WHERE id_usuario = ?',[usuario.id]);

    //Query para eliminar un usuario
    await connection.query(consultas.deleteUsuario + 'WHERE id_usuario = ?', [usuario.id]);

    res.status(202).json({
        mensaje: 'Usuario Eliminado',result
    })

}

module.exports = {
    getAll,
    getById,
    postUsuario,
    putUsuario,
    deleteUsuario
};