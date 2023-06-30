const { request, response } = require('express');
const conecction = require('../config/conecction');

const getAll = async (req = request, res = response) => {
    const [result] = await conecction.query('SELECT * FROM Estudiante');
    res.json(result);
};

const getbyId = async (req = request, res = response, id) => {
    const [result] = await conecction.query(`SELECT * FROM Estudiante 
                                                WHERE id_estudiante = ${id}`);
};

const putbyId = async (req = request, res = response, id) => {
    const [result] = await conecction.query(``);
}

const postEstudiante = async (req = request, res = response)=>{
    const [result] = await conecction.query(`INSERT INTO Estudiante(nombre, apellido, cedula, nivel, facultad_id, carrera_id, foto)
                                                VALUES()`)
}

const dlbyId = async (req = request, res = response, id) => {
    const [result] = await conecction.query(`DELETE FROM Estudiante 
                                                WHERE id_estudiante = ${id}`);
}

module.exports = {
    getAll,
    getbyId,
    putbyId,
    postEstudiante,
    dlbyId
}