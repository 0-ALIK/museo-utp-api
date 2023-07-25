//Librerias (Express, Connection, consultas-helper, jwt-helpers, bcrypt)
const {response, request} = require('express');
const connection = require('../config/connection');
const consultas = require('../helpers/consultas-helper');
const bcrypt = require('bcrypt');
const { subirFoto, borrarFoto } = require('../helpers/fireStorage-helper')
const { agregarDatosEstudiante, crearConsultaUpdate, validarDataForUpdate } = require('../helpers/database-helpers');

//Mostrar todos los usuario
const getAll = async (req = request, res = response) => {

    let extras = "";
    let data = []

    if(req.query.query && req.query.query?.length !== 0) {
        extras+="LOWER(us.nombre_usuario) LIKE CONCAT('%', LOWER( ? ), '%') ";
        data.push( req.query.query );
    }
    
    try {
        if(extras.length !== 0) {
            const [ result ] = await connection.query( consultas.estudianteAndUserByAnyWhere + "WHERE " + extras, data );    
            return res.status(200).json(result);
        }

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
        const [result] = await connection.query(consultas.estudianteAndUserByAnyWhere + 'WHERE es.id_estudiante = ?', [id]);
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
    let foto = null;

    if( req.files && req.files.foto )
        foto = req.files.foto;

    try {
        //Hasheo de contrasena que sera almacenada en la base de datos
        const salt = bcrypt.genSaltSync()
        const hashPassword = bcrypt.hashSync(password, salt);
    
        //Query para postear los datos de un usuario
        const [ metadata ] = await connection.query(consultas.postUsuario, [nombre_usuario, hashPassword])
        const newidusuario = metadata.insertId;
    
        //Query para consultar los datos de un usuario
        const [resultUsuario] = await connection.query(consultas.usuarioByAnyWhere + 'WHERE id_usuario = ?', [newidusuario]);
        const usuario = resultUsuario[0];

        let fotoUrl = null; 

        if(foto)
            fotoUrl = await subirFoto( foto );
    
        //Query para postear los datos de un estudiante
        const [ metadata2 ] = await connection.query(consultas.postEstudiante,[nombre, apellido, cedula, nivel, id_facultad, id_carrera, fotoUrl, usuario.id]);
        const newidestud = metadata2.insertId;
    
        //Query para consultar los datos de un estudiante
        const [resultEstud] = await connection.query(consultas.estudianteByAnyWhere + 'WHERE es.id_estudiante = ?', [newidestud]);
    
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

    let foto = null;

    if( req.files && req.files.foto )
        foto = req.files.foto;
    
    try {
        
        if ( !validarDataForUpdate( body, ['nombre', 'apellido', 'foto', 'nivel', 'id_facultad', 'id_carrera'] ) ) {    
            return res.status(400).json({msg: 'enviaste un dato que no se puede actualizar o no existe'});
        }
        
        if(foto) {
            if( usuario.foto )
                await borrarFoto( usuario.foto );
            
            body.foto = await subirFoto( foto );
        }

        await crearConsultaUpdate('estudiante', body, 'id_estudiante', usuario.id);

        const [result] = await connection.query(consultas.estudianteAndUserByAnyWhere + 'WHERE es.id_estudiante = ?', [usuario.id]);
    
        res.status(202).json(result[0]);
        
    } catch (error) {
        res.status(500).json({
            msg: 'error al hacer el update',
            datos,
            error
        });
    }
}

//Eliminar un usuario
const deleteUsuario = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        //Query para consultar los datos de un usuario
        const [ result ] = await connection.query(consultas.estudianteAndUserByAnyWhere + 'WHERE es.id_estudiante = ?', [id]);
        const usuario = result[0];

        if(!usuario) {
            return res.status(400).json({msg: 'no existe estudiante con id: '+id});
        }

        if(usuario.rol === 'ADMIN') {
            return res.status(403).json({msg: 'no puedes eliminar al ADMIN: '+usuario.nombre_usuario});
        }
    
        //Query para eliminar un usuario
        await connection.query(consultas.deleteUsuario + 'WHERE id_usuario = ?', [usuario.id_usuario]);

        if( usuario.foto )
            await borrarFoto( usuario.foto );
    
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