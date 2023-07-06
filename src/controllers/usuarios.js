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
    const [result] = await connection.query(consultas.usuarioByAnyWhere + 'WHERE id_usuario = ?', id);
    res.status(200).json(result);
}

//postear un usuario
const postUsuario = async (req = request, res = response) => { 
    const {nombreUsuario, password, rol, nombre, apellido, } = req.body;

    //Hasheo de contrasena que sera almacenada en la base de datos
    const salt = bcrypt.genSaltSync()
    const hashPassword = bcrypt.hashSync(password, salt);

    const [result] = await connection.query(consultas.postUsuario, [nombreUsuario, hashPassword])
    const usuario = result[0];

    //En caso de ser estudiante se almacenan los datos, sino, no entraria en el query de insertar estudiante
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

//Modificar datos de un usuario
const putUsuario = async (req = request, res = response) =>{
    const usuario = req.usuarioAuth;

    if(!usuario){
        return res.status(404).json({
            mensaje: 'Error: No se encontro el usuario'
        })
    }

    const {usuarioNombre, nombre, apellido,  cedula, nivel, id_facultad, id_carrera, foto} = req.body; 

    //Query para postear un usuario
    const [result] = await connection.query(consultas.putUsuario + 'WHERE id_usuario = ?',[usuarioNombre, usuario.id])

    res.status(202).json({
        mensaje: 'Usuario Creado'
    });
}

//Eliminar un usuario
const deleteUsuario = async (req = request, res = response) =>{
    const usuario = req.usuarioAuth;

    if(!usuario){
        return res.status(404).json({
            mensaje: 'Error: No se encontro el usuario'
        })
    }

    //Query para eliminar un usuario
    const [result] = connection.query(consultas.deleteUsuario + 'WHERE id_usuario = ?', [usuario.id]);
    res.status(202).json({
        mensaje: 'Usuario Creado'
    })

}

module.exports = {
    getAll,
    getById,
    postUsuario,
    putUsuario,
    deleteUsuario
};