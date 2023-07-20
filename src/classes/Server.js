const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { facultades, carreras, auth, visitantes, usuarios, articulos, comentarios, categorias } = require('../routes');

/**
 * Esta clase engloba toda la lógica y configuración del servidor
 * API REST, como por ejemplo: los middlewares, las rutas, sockets,
 * conexiones con bases de datos, etc.
 */
class Server {

    constructor() {
        // express aplication
        this.app = express();

        // opteniendo el puerto de las variables de entorno
        this.PORT = process.env.PORT;

        // definición de los endpoints de la API
        this.paths = {
            facultades: "/api/facultades",
            carreras: "/api/carreras",
            visitantes: "/api/visitantes",
            usuarios: "/api/usuarios",
            auth: "/api/auth",
            articulos: "/api/articulos",
            comentarios: "/api/comentarios",
            categorias: "/api/categorias"
        };

        this.middlewares();
        this.rutas();
    }

    /**
     * Define los middlewares generales o globales
     */
    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( fileUpload() );
    }

    /**
     * Define las rutas endpoints del API REST
     */
    rutas() {
        this.app.get('/', (req, res) => {
            res.send('Museo UTP - API');
        });
        this.app.use( this.paths.facultades, facultades );
        this.app.use( this.paths.carreras, carreras );
        this.app.use( this.paths.usuarios, usuarios );
        this.app.use( this.paths.auth, auth );
        this.app.use( this.paths.visitantes, visitantes );
        this.app.use( this.paths.articulos, articulos );
        this.app.use( this.paths.comentarios, comentarios );
        this.app.use( this.paths.categorias, categorias );
    }

    /**
     * Enciende el API REST
     */
    init() {
        this.app.listen( this.PORT, () => {
            console.log('>>> Museo UTP - API started <<<') ;
        });
    }

}   

module.exports = Server;