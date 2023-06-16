// Establece la configuración de la dependencia dotenv para trabajar con variables de entorno
require('dotenv').config();

const Server = require('./classes/Server');

const server = new Server();
server.init();