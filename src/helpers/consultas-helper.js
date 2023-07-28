const consultas = {
    usuarioByAnyWhere: `
    SELECT 
        id_usuario as id,
        nombre_usuario,
        contrasena as password,
        rol,
        created_at,
        updated_at
    FROM usuario `,

    estudianteByAnyWhere: `
    SELECT
        es.id_estudiante as id,
        es.usuario_id,
        es.nombre,
        es.apellido,
        es.cedula,
        es.nivel,
        es.foto,
        fa.nombre as facultad,
        ca.nombre as carrera
    FROM estudiante as es
    JOIN facultad as fa
    ON fa.id_facultad = es.facultad_id
    JOIN carrera as ca
    ON ca.id_carrera = es.carrera_id `,

    estudianteAndUserByAnyWhere: `
    SELECT
        es.id_estudiante as id,
        us.nombre_usuario,
        us.id_usuario,
        us.rol,
        es.nombre,
        es.apellido, 
        es.cedula,
        es.nivel,
        es.foto,
        fa.nombre as facultad,
        ca.nombre as carrera
    FROM estudiante as es
    JOIN facultad as fa
    ON fa.id_facultad = es.facultad_id
    JOIN carrera as ca
    ON ca.id_carrera = es.carrera_id 
    JOIN usuario as us 
    ON us.id_usuario = es.usuario_id `,
    
    visitanteById: `
    SELECT
        es.id_estudiante AS id,
        us.nombre_usuario,
        es.nombre,
        es.apellido,
        es.cedula,
        us.rol,
        es.nivel,
        fa.nombre AS facultad,
        ca.nombre AS carrera,
        vi.fecha
    FROM visitante AS vi
    JOIN articulo AS ar
    ON vi.articulo_id = ar.id_articulo
    JOIN estudiante AS es
    ON vi.estudiante_id = es.id_estudiante
    JOIN usuario AS us
    ON es.usuario_id = us.id_usuario
    JOIN facultad AS fa
    ON fa.id_facultad = es.facultad_id
    JOIN carrera AS ca
    ON ca.id_carrera = es.carrera_id
    WHERE ar.id_articulo = ?`,

    insertVisita: `
    INSERT INTO 
        visitante(estudiante_id, articulo_id)
    VALUES
        (?, ?)`,

    postUsuario: `
        INSERT INTO usuario (nombre_usuario, contrasena)
        VALUES (?, ?)
    `,

    postEstudiante:`
        INSERT INTO estudiante (nombre, apellido, cedula, nivel, facultad_id, carrera_id, foto, usuario_id)
        VALUES(?, ?, ?, ?, ? ,? ,?, ?)
    `,

    putUsuario: `
        UPDATE usuario
        SET nombre_usuario = ?
    
    `,  

    deleteUsuario:`
        DELETE FROM usuario
    `,
    
    getAllArticulos: `
    SELECT 
    ar.id_articulo as id, 
    ar.nombre,
    ca.nombre as categoria,
    ar.descripcion, 
    ar.ubicacion,
    ar.dueno,
    ar.year,
    ar.created_at, 
    ar.updated_at 
    FROM articulo as ar
    JOIN categoria as ca
    ON ca.id_categoria = ar.categoria_id `,

    getAllArticulosByName: `
    SELECT 
    ar.id_articulo as id, 
    ar.nombre,
    ca.nombre as categoria,
    ar.descripcion, 
    ar.ubicacion,
    ar.dueno,
    ar.year,
    ar.created_at, 
    ar.updated_at 
    FROM articulo as ar
    JOIN categoria as ca
    ON ca.id_categoria = ar.categoria_id
    WHERE LOWER(ar.nombre) LIKE CONCAT('%', LOWER( ? ), '%')`,

    getArticuloFotos: `
    SELECT 
    id_multimedio as id,
    url,
    tipo
    FROM multimedio
    WHERE tipo like 'imagen' 
    and articulo_id = ?`,

    getArticuloById: `
    SELECT
    ar.id_articulo as id, 
    ar.nombre,
    ca.nombre as categoria,
    ar.descripcion, 
    ar.ubicacion,
    ar.dueno,
    ar.year,
    ar.created_at, 
    ar.updated_at 
    FROM articulo as ar
    JOIN categoria as ca
    ON ca.id_categoria = ar.categoria_id 
    WHERE ar.id_articulo = ?`,

    getArticuloByIdMultimedios: `
    SELECT 
    id_multimedio as id, 
    url, tipo 
    FROM multimedio 
    WHERE articulo_id = ?`,

    insertArticulo:`
    INSERT INTO articulo(nombre, descripcion, categoria_id, ubicacion, dueno, year)
    VALUES(?, ?, ?, ?, ?, ?)`,   

    insertMultimedio:`
    INSERT INTO multimedio(url, tipo, articulo_id)
    VALUES(?, ?, ?)`,
    
    getMultimediosUrl:`SELECT url 
    FROM multimedio 
    where id_multimedio = ? AND articulo_id = ?`,

    deleteMultimedio:`
    delete from multimedio where id_multimedio = ? AND articulo_id = ?
    `,

    deleteArticulo:`
    delete from articulo where id_articulo = ?
    `,

    updateArticulo:`UPDATE articulo 
    set nombre = ?, descripcion = ?, categoria_id = ?
    where id_articulo = ?`,

    getAllMultimediosId: `select id_multimedio as id
     from multimedio 
     where articulo_id = ?`,

    getComentariosByAnyWhere: `
    SELECT 
        co.id_comentario as id,
        es.id_estudiante,
        es.nombre,
        es.apellido,
        es.foto,
        co.comentario,
        co.articulo_id
    FROM comentario as co 
    JOIN estudiante as es
    ON es.id_estudiante = co.estudiante_id `,

    dejarComentarioEnArticulo: `
    INSERT INTO comentario (estudiante_id, comentario, articulo_id) 
    VALUES (?, ?, ?);
    `,

    borrarComentarioById: `
    DELETE FROM comentario WHERE estudiante_id = ? AND id_comentario = ?
    `,
    selectFacultad: 'SELECT id_facultad as id, nombre FROM facultad ',
    insertFacultad: 'INSERT INTO facultad (nombre) VALUES (?)',
    borrarFacultad: 'DELETE FROM facultad WHERE id_facultad = ?', 
    selectCarrera: `
    SELECT 
        ca.id_carrera as id, 
        ca.nombre, 
        fa.nombre as facultad
    FROM carrera as ca 
    JOIN facultad as fa 
    ON ca.facultad_id = fa.id_facultad `,
    insertCarrera: 'INSERT INTO carrera (facultad_id, nombre) VALUES (?, ?)',
    borrarCarrera: 'DELETE FROM carrera WHERE id_carrera = ?'
};

module.exports = consultas;