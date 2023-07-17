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
        us.nombre_usuario AS usuario,
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
        
    getLastVisitante: `
    SELECT
        *
    FROM visitante
    WHERE id_visitante = LAST_INSERT_ID()`,


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
    SELECT id_articulo as id, 
    nombre, 
    categoria_id,
    descripcion, 
    ubicacion,
    dueno,
    created_at, 
    updated_at 
    FROM articulo
    limit ? 
    offset ?`,

    getAllArticulosByName: `
    SELECT * 
    FROM articulo
    WHERE nombre LIKE ?`,

    getArticuloFotos: `
    SELECT * 
    FROM multimedio
    WHERE tipo like 'imagen' 
    and articulo_id = ?`,

    getArticuloById: `
    SELECT
    id_articulo as id, 
    nombre,
    categoria_id,
    descripcion, 
    ubicacion,
    dueno,
    created_at, 
    updated_at  
    FROM articulo 
    WHERE id_articulo = ?`,

    getArticuloByIdMultimedios: `
    SELECT 
    id_multimedio, 
    url, tipo 
    FROM multimedio 
    WHERE articulo_id = ?`,

    insertArticulo:`
    INSERT INTO articulo(nombre, descripcion, categoria_id, ubicacion, dueno)
    VALUES(?, ?, ?, ?, ?)`,   

    getInsertedId:`select max(id_articulo) as id 
    from articulo`,

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
    `
};

module.exports = consultas;