const { request, response } = require("express");
const Hospital = require("../models/Hospital");

const getHospitales = async(req = request, res = response) => {
    try {
        // Recuperar queryString de ruta (páginación)
        const desde = Number(req.query.desde) || 0;

        // consultar todos los hospitales registrados
        // Poblar el campo usuario (id documento), con el nombre e imagen del usuario relacionado
        const hospitales = await Hospital.find().populate('usuario', 'nombre img').skip(desde).limit(5);

        const total = await Hospital.count();

        res.status(200).json({
            ok: true,
            hospitales,
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

const getAllHospitales = async(req = request, res = response) => {
    try {
        // consultar todos los hospitales registrados
        // Poblar el campo usuario (id documento), con el nombre e imagen del usuario relacionado
        const hospitales = await Hospital.find().populate('usuario', 'nombre img');

        res.status(200).json({
            ok: true,
            hospitales,
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

const actualizarHospital = async(req = request, res = response) => {
    try {
        // Recuperar el id del hospital
        const id = req.params.id;
        // Recuperar el uid del usuario que esta llevando a cabo la actualización
        const uid = req.uid;

        // Verificar si existe el registro
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado con el id especificado'
            });
        }

        // Actualizar los datos del hospital (incluyendo el id de la persona que esta llevando a cabo esta tarea)
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
        
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.status(200).json({
            ok: true,
            hospitalActualizado
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
        console.log(err);
    }
    
};

const eliminarHospital = async(req = request, res = response) => {
    try {
        // Recuperar el id del hospital
        const id = req.params.id;

        // Verificar si existe el registro
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado con el id especificado'
            });
        }

        // Eliminar el hospital por su id
        await Hospital.findByIdAndRemove(id);

        res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado'
        });
    } catch (erro) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
        console.log(err);
    }
};

module.exports = {
    getHospitales,
    getAllHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}