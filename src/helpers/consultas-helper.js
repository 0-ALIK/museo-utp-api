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
    
    getAllArticulos: `
    SELECT id_articulo as id, 
    nombre, 
    categoria_id,
    descripcion, 
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
    SELECT * 
    FROM articulo 
    WHERE id_articulo = ?`,

    getArticuloByIdMultimedios: `
    SELECT 
    id_multimedio, 
    url, tipo 
    FROM multimedio 
    WHERE articulo_id = ?`,

    insertArtciculo:`
    INSERT INTO articulo()
    `
};

module.exports = consultas;