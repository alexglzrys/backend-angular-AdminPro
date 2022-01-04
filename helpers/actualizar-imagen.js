const fs = require('fs');
const Hospital = require('../models/Hospital');
const Medico = require('../models/Medico');
const Usuario = require("../models/Usuario");

const borrarImagen = (pathImagenActual) => {
    console.log(pathImagenActual)
    if (fs.existsSync(pathImagenActual)) {
        // Borrar imagen física anterior 
        fs.unlinkSync(pathImagenActual);
    }
}

const actualizarImagen = async(coleccion, id, nombreArchivo) => {
    try {
        switch(coleccion) {
            case 'usuarios':
                const usuario = await Usuario.findById(id);
                if (!usuario) {
                    console.log('El usuario especificado no existe');
                    return false;
                }
                // Verificar si el usuario tiene una imagen previa asociada (es necesario eliminarla)
                borrarImagen(`./uploads/usuarios/${usuario.img}`);

                // Actualizar la nueva imagen en base de datos
                usuario.img = nombreArchivo;
                await usuario.save();
                
                return true;
            case 'medicos':
                const medico = await Medico.findById(id);
                if (!medico) {
                    console.log('El médico especificado no existe');
                    return false;
                }
                // Verificar si el usuario tiene una imagen previa asociada (es necesario eliminarla)
                borrarImagen(`./uploads/medicos/${medico.img}`);

                // Actualizar la nueva imagen en base de datos
                medico.img = nombreArchivo;
                await medico.save();
                
                return true;
            case 'hospitales':
                const hospital = await Hospital.findById(id);
                if (!hospital) {
                    console.log('El hospital especificado no existe');
                    return false;
                }
                // Verificar si el usuario tiene una imagen previa asociada (es necesario eliminarla)
                borrarImagen(`./uploads/hospitales/${hospital.img}`);

                // Actualizar la nueva imagen en base de datos
                hospital.img = nombreArchivo;
                await hospital.save();
        }
    } catch (err) {
        console.log(err);
        // TODO: Lanzar el error y atraparlo en la función principal
    }
    
}

module.exports = {
    actualizarImagen
}