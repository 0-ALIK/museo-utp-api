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
    
};

module.exports = consultas;