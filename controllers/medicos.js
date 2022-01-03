const { request, response } = require("express");
const Medico = require("../models/Medico");

const getMedicos = async(req = request, res = response) => {
    try {
        // consultar todos los médicos registrados
        // Poblar el campo usuario (id documento), con el nombre e imagen del usuario relacionado
        // Poblar el campo hospital (id documento), con el nombre e imagen del hospital relacionado
        const medicos = await Medico.find()
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img')

        res.status(200).json({
            ok: true,
            medicos
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
        console.log(err);
    }
};

const crearMedico = async(req = request, res = response) => {
    try {
        // Recuperar id usuario encargado de llevar a cabo el registro
        const uid = req.uid;
        // Preparar el registro
        const medico = new Medico({
            ...req.body,
            usuario: uid
        });

        // Registrar médico en base de datos
        await medico.save();

        res.status(200).json({
            ok: true,
            medico
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
        console.log(err);
    }
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