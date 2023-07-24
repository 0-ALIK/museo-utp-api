const connection = require("../config/connection");

const nameRegExp = /^[a-zA-Z0-9_]+$/; 
const cedulaRegExp = /^([0-9]-[0-9]{3}-[0-9]{4}|[1][0-3]-[0-9]{3}-[0-9]{4}|[2][0]-[0-9]{2}-[0-9]{4}|[E]-[0-9]-[0-9]{6}|[E]-[0-9]{4}-[0-9]{5}|[N]-[0-9]{2}-[0-9]{5}|[N]-[0-9]{3}-[0-9]{4}|[P][E]-[0-9]{3}-[0-9]{4}|[E][E]-[0-9]{3}-[0-9]{3})$/;


/**
 * Si un usuario tiene el rol 'ESTUD' es porque es estudiante,
 * por lo tanto, tiene datos en la tabla estudiante. 
 * Esta función se encarga de tomar un objeto usuario y agregarle
 * los datos de estudiante que le faltan
 * @param {*} usuario es el objeto usuario
 * @param {*} result es el objeto de resultados de la consulta a la tabla estudiante
 */
const agregarDatosEstudiante = (usuario, result) => {
    usuario.id = result[0].id;
    usuario.usuario_id = result[0].usuario_id
    usuario.nombre = result[0].nombre;
    usuario.apellido = result[0].apellido;
    usuario.cedula = result[0].cedula;
    usuario.facultad = result[0].facultad;
    usuario.carrera = result[0].carrera;
    usuario.nivel = result[0].nivel;
    
    if(result[0].foto)
        usuario.foto = result[0].foto;
};

function validarDataForUpdate(objeto, propiedadesPermitidas) {
    const propiedadesObjeto = Object.keys(objeto);
  
    const propiedadesNoPermitidas = propiedadesObjeto.filter( propiedad => !propiedadesPermitidas.includes(propiedad) );
  
    if (propiedadesNoPermitidas.length > 0) {
        return false;
    }
  
    return true;
} 

/**
 * En esta API, para hacer un update, todos los datos son opcionales
 * por lo tanto, hay que construir una consulta UPDATE en base a los datos
 * que estan presenten, unicamente los que están presentes en la petición
 * @param {*} tabla es el nombre de la tabla en la que haremos el UPDATE
 * @param {*} data es el objeto con todos los datos que vienen en la petición
 * @param {*} campoid es el campo de la tabla que almacena el id
 * @param {*} id es el id xd
 * @returns un arreglo con la consulta y los datos para el query
 */
const crearConsultaUpdate = async (tabla, data, campoid, id) => {
    const keys = Object.keys( data );
    let consulta = 'UPDATE '+tabla+' SET ';
    let datos = [];

    if(keys.length === 0) {
        return;
    }

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        consulta += key + ' = ? ';

        if(!isNaN( data[key] )) {
            datos.push( parseInt(data[key]) );    
        } else {
            datos.push( data[key] );
        }

        if (i < keys.length - 1) {
            consulta += ', ';
        }
    }

    consulta += 'WHERE '+campoid+' = ?';
    datos.push( id );

    await connection.query( consulta, datos ); 
};

const existeNombreUsuario = async ( value ) => {
    const consulta = 'SELECT * FROM usuario WHERE nombre_usuario = ?'; 
    const [ usuarios ] = await connection.query( consulta, [ value ] );
    const usuario = usuarios[0];
    if( usuario ) {
        throw new Error('El nombre de usuario '+value+' ya esta ocupado');
    }

    return true;
};

const existeCedula = async ( value ) => {
    const consulta = 'SELECT * FROM estudiante WHERE cedula = ?'; 
    const [ estudiantes ] = await connection.query( consulta, [ value ] );
    const estudiante = estudiantes[0];
    if( estudiante ) {
        throw new Error('La cédula '+value+' ya esta ocupada');
    }

    return true;
};

module.exports = {
    agregarDatosEstudiante,
    crearConsultaUpdate,
    nameRegExp,
    cedulaRegExp,
    existeNombreUsuario,
    existeCedula,
    validarDataForUpdate
};