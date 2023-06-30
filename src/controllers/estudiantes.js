const { request, response } = require('express');
const conecction = require('../config/conecction');

const getAll = async (req = request, res = response) => {
    const [result] = await conecction.query('SELECT * FROM Estudiante');
    res.json(result);
};

const getbyId = async (req = request, res = response) => {
    const id = req.params.id;
    const [result] = await conecction.query('SELECT * FROM Estudiante WHERE id_estudiante = ?', [id]);
    res.json(result);
};

const putbyId = async (req = request, res = response) => {
    //const [result] = await conecction.query(`);
    res.send("Ruta de Modificar estudiantes")
}

const postEstudiante = async (req = request, res = response)=>{
    //const [result] = await conecction.query('INSERT INTO Estudiante(nombre, apellido, cedula, nivel, facultad_id, carrera_id, foto) VALUES()')
    res.send("Ruta de Agregar estudiantes");
}

const dlbyId = async (req = request, res = response) => {
    const id = req.params.id;
    //const [result] = await conecction.query('DELETE FROM Estudiante WHERE id_estudiante = ?',[id]);
    res.send("Ruta de Eliminar estudiante");
}

module.exports = {
    getAll,
    getbyId,
    putbyId,
    postEstudiante,
    dlbyId
}