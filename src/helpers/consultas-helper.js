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

    postUsuario: `
        INSERT INTO usuario (nombre_usuario, contrasena)
        VALUES (?, ?, ?)
    `,

    postEstudiante:`
        INSERT INTO estudiante (nombre, apellido, cedula, nivel, facultad_id, carrera_id, foto)
        VALUES(?, ?, ?, ?, ? ,? ,?)
    `,

    putUsuario: `
        UPDATE usuario
        SET nombre_usuario = ?
    `,

    deleteUsuario:`
        DELETE FROM usuario
    `
};

module.exports = consultas;