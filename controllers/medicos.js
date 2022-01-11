const { request, response } = require("express");
const Medico = require("../models/Medico");

const getMedicos = async(req = request, res = response) => {
    try {
        // Recuperar queryString de ruta (páginación)
        const desde = Number(req.query.desde) || 0;

        // consultar todos los médicos registrados
        // Poblar el campo usuario (id documento), con el nombre e imagen del usuario relacionado
        // Poblar el campo hospital (id documento), con el nombre e imagen del hospital relacionado
        const medicos = await Medico.find()
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img')
                                    .skip(desde).limit(5);

        const total = await Medico.count();
        

        res.status(200).json({
            ok: true,
            medicos,
            total
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

const actualizarMedico = async(req = request, res = response) => {
    try {
        // Recuperar el id del médico a actualizar
        const id = req.params.id;
        // Recuperar el id del usuario que lleva a cabo esta gestión
        const uid = req.uid;
        // Verificar si el médico existe en base de datos
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'El médico no existe en la base de datos'
            });
        }
        // Actualizar datos
        const nuevosDatos = {
            ...req.body,
            usuario: uid
        };
        // Guardar cambios en base de datos
        const medicoActualizado = await Medico.findByIdAndUpdate(id, nuevosDatos, { new: true })
                                              .populate('usuario', 'nombre img')
                                              .populate('hospital', 'nombre img');

        res.status(200).json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
        console.log(err)
    }
    
};

const eliminarMedico = async(req = request, res = response) => {
    try {
        // Recuperar id del médico a eliminar
        const id = req.params.id;
        // Buscar medico
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'El médico no existe en la base de datos'
            });
        }
        // Eliminar médico de base de datos
        await Medico.findByIdAndRemove(id);
        res.status(200).json({
            ok: true,
            msg: 'Médico eliminado'
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
        console.log(err)
    }
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}