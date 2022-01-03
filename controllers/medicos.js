const { request, response } = require("express");

const getMedicos = (req = request, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'get medicos'
    });
};

const crearMedico = (req = request, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'crear medico'
    });
};

const actualizarMedico = (req = request, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'actualizar medico'
    });
};

const eliminarMedico = (req = request, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'eliminar medico'
    });
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}