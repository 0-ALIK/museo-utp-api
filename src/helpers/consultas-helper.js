const consultas = {
    usuarioById: `
    SELECT 
        id_usuario AS id,
        rol,
        nombre,
        apellido,
        cedula,
        foto,
        created_at,
        updated_at 
    FROM usuario WHERE id_usuario = ?`,

    estudianteById: `
    SELECT
        es.nivel,
        ca.nombre as carrera,
        fa.nombre as facultad
    FROM estudiante AS es
    JOIN carrera AS ca
    ON es.carrera_id = ca.id_carrera
    JOIN facultad AS fa
    ON fa.id_facultad = es.facultad_id
    WHERE es.usuario_id = ?`,
    
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