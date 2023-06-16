const Server = require('../src/classes/Server');
const server = new Server();
const request = require('supertest');

describe("Conjunto de pruebas para la ruta raíz \"/\"", () => {

    test("La ruta ruta raíz \"/\" debería responder con \"Museo UTP - API\"", async () => {
        const response = await request(server.app).get('/');
        expect(response.text).toBe('Museo UTP - API');
    });

});
