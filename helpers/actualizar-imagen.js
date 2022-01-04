const fs = require('fs');
const Usuario = require("../models/Usuario");

const actualizarImagen = async(coleccion, id, nombreArchivo) => {
    try {
        switch(coleccion) {
            case 'usuarios':
                const usuario = await Usuario.findById(id);
                console.log(usuario);
                if (!usuario) {
                    console.log('El usuario especificado no existe');
                    return false;
                }
                // Verificar si el usuario tiene una imagen previa asociada (es necesario eliminarla)
                const pathImagenActual = `./uploads/usuarios/${usuario.img}`;
                if (fs.existsSync(pathImagenActual)) {
                    // Borrar imagen física anterior 
                    fs.unlinkSync(pathImagenActual);
                }
                // Actualizar la nueva imagen en base de datos
                usuario.img = nombreArchivo;
                await usuario.save();
                
                return true;
            case 'medicos':
                break;
            case 'hospitales':
                break;
        }
    } catch (err) {
        console.log(err);
        // TODO: Lanzar el error y atraparlo en la función principal
    }
    
}

module.exports = {
    actualizarImagen
}