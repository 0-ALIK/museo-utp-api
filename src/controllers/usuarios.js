//Librerias (Express, Connection, consultas-helper, jwt-helpers, bcrypt)
const {response, request} = require('express');
const connection = require('../config/connection');
const consultas = require('../helpers/consultas-helper');
const bcrypt = require('bcrypt');
const { agregarDatosEstudiante, crearConsultaUpdate } = require('../helpers/database-helpers');

//Mostrar todos los usuario
const getAll = async (req = request, res = response) => {
    
    try {
        //consulta de todos los estudiantes
        const [result] = await connection.query(consultas.estudianteAndUserByAnyWhere);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            msg: 'error al obtener los estudiantes',
            error
        });
    }
}

//Mostrar un usuario en base a su ID
const getById = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        //consulta de un usuario segun ID
        const [result] = await connection.query(consultas.estudianteAndUserByAnyWhere + 'WHERE id_usuario = ?', [id]);
        res.status(200).json(result[0]);

    } catch (error) {
        res.status(500).json({
            msg: 'error al obtener el usuario por el id: '+id,
            error
        });
    }
}

//postear un usuario
const postUsuario = async (req = request, res = response) => {
    
    const { nombre_usuario, password, nombre, apellido, cedula, nivel, id_facultad, id_carrera } = req.body;

    try {
        //Hasheo de contrasena que sera almacenada en la base de datos
        const salt = bcrypt.genSaltSync()
        const hashPassword = bcrypt.hashSync(password, salt);
    
        //Query para postear los datos de un usuario
        await connection.query(consultas.postUsuario, [nombre_usuario, hashPassword])
    
        //Query para consultar los datos de un usuario
        const [resultUsuario] = await connection.query(consultas.usuarioByAnyWhere + 'WHERE id_usuario = LAST_INSERT_ID()');
        const usuario = resultUsuario[0];
    
        //Query para postear los datos de un estudiante
        await connection.query(consultas.postEstudiante,[nombre, apellido, cedula, nivel, id_facultad, id_carrera, usuario.id]);
    
        //Query para consultar los datos de un estudiante
        const [resultEstud] = await connection.query(consultas.estudianteByAnyWhere + 'WHERE es.id_estudiante = LAST_INSERT_ID()');
    
        agregarDatosEstudiante(usuario, resultEstud);

        delete usuario.password;
    
        res.status(201).json(usuario)
    } catch (error) {
        res.status(500).json({
            msg: 'error al hacer el registro',
            body: req.body,
            error
        });
    }
}

//Modificar datos de un usuario
const putUsuario = async (req = request, res = response) =>{

    // datos extraidos por el req.usuarioAuth
    const usuario = req.usuarioAuth;

    // datos extraidos por el req.body
    const body = req.body;

    
    try {
        
        // Aqui se realiza el update
        /* const [consulta, datos] =  */await crearConsultaUpdate('estudiante', body, 'id_estudiante', usuario.id);
        //await connection.query(consulta, datos);
    
        const [result] = await connection.query(consultas.estudianteAndUserByAnyWhere + 'WHERE es.id_estudiante = ?', [usuario.id]);
    
        res.status(202).json(result[0]);
        
    } catch (error) {
        res.status(500).json({
            msg: 'error al hacer el update',
            datos,
            consulta,
            error
        });
    }
}

//Eliminar un usuario
const deleteUsuario = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        //Query para consultar los datos de un usuario
        const [ result ] = await connection.query(consultas.estudianteByAnyWhere + 'WHERE es.id_estudiante = ?', [id]);
        const usuario = result[0];

        if(!usuario) {
            return res.status(400).json({msg: 'no existe estudiante con id: '+id});
        }
    
        //Query para eliminar un usuario
        await connection.query(consultas.deleteUsuario + 'WHERE id_usuario = ?', [usuario.usuario_id]);
    
        res.status(202).json(usuario);
    } catch (error) {
        res.status(500).json({
            msg: 'error al hacer el DELETE al estudiante con id: '+id,
            error
        });
    }

}

module.exports = {
    getAll,
    getById,
    postUsuario,
    putUsuario,
    deleteUsuario
};