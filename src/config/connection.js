const { createPool } = require('mysql2/promise');
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env

// Objeto de conexión a la base de datos
// permite gestionar todo realcionado con la base de datos
const connection = createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
});

module.exports = connection;