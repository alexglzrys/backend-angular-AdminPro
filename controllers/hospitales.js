const { request, response } = require("express");

const getHospitales = (req = request, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'get hospitales'
    });
};

const crearHospital = (req = request, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'crear hospitales'
    });
};

const actualizarHospital = (req = request, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'actualizar hospitales'
    });
};

const eliminarHospital = (req = request, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'eliminar hospitales'
    });
};

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}