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
    WHERE id_visitante = LAST_INSERT_ID()`

};

module.exports = consultas;