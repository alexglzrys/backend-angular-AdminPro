const { request, response } = require("express");
const Hospital = require("../models/Hospital");

const getHospitales = async(req = request, res = response) => {
    try {
        // consultar todos los hospitales registrados
        // Poblar el campo usuario (id documento), con el nombre e imagen del usuario relacionado
        const hospitales = await Hospital.find().populate('usuario', 'nombre img');

        res.status(200).json({
            ok: true,
            hospitales
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
        console.log(err);
    }
};

const crearHospital = async(req = request, res = response) => {
    // Recuperar el id del usuario que actualmente esta realizando el registro
    const uid = req.uid;
    // Preparar los datos para el registro
    const hospital = new Hospital({
        ...req.body,
        usuario: uid    // le sumamos el id del usuario
    });
    
    try {
        // Registrar el hospital en base de datos
        await hospital.save();

        res.status(200).json({
            ok: true,
            hospital
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
        console.log(err);
    }
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