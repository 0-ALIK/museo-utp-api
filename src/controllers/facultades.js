const { request, response } = require('express');
const conecction = require('../config/conecction');

const getAll = async (req = request, res = response) => {
    const [result] = await conecction.query('SELECT * FROM Facultad');
    res.json(result);
};

module.exports = {
    getAll
}