const { v4: uuidv4 } = require('uuid');
const { request, response } = require("express");
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req = request, res = response) => {
    // Obtener la colección y el id del documento a asignarle una imagen
    const coleccion = req.params.coleccion;
    const id = req.params.id;

    // Verificar que la colección seleccinada sea válida (solo se puede asignar imagens a usuarios, medicos u hospitales)
    const coleccionesValidas = ['usuarios', 'medicos', 'hospitales']
    if (!coleccionesValidas.includes(coleccion)) {
        return res.status(400).json({
            ok: false,
            coleccion,
            msg: 'El tipo de colección no es válido, colecciones válidas pueden ser: usuarios|medicos|hospitales'
        });
    }

    // Verificar que el archivo exista en el cuerpo de la peticion
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se envió ningún archivo para subir'
        });
    }

    // Procesar el archivo y registrarlo en base de datos
    const file = req.files.imagen;
    // Obtener nombre y extensión del archivo
    const nombre_extension_Archivo = file.name.split('.');
    // Extensión de archivo (es la parte que aparece después del último punto)
    const extensionArchivo = nombre_extension_Archivo[nombre_extension_Archivo.length - 1];

    // Validar extensiones
    const extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'extensión de archivo no válida, solo se aceptan: jpg|png|jpeg|gif'
        });
    }

    // Generar nombre de archivo único (adjuntando su extensión)
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Especificar lugar permanente dónde se aloja el archivo en el servidor
    // Verificar que el directorio y subdirectorios existan (la librería no los crea)
    const uploadPath = `./uploads/${coleccion}/${nombreArchivo}`;

    // Mover archivo
    file.mv(uploadPath, (err) => {
        if (err) {
            console.log(err, uploadPath);
            return res.status(500).json({
                ok: false,
                msg: 'Error interno en el servior, no se pudo subir el archivo'
            });
           
        }
        
        // Actualizar el registro en base de datos
        if (!actualizarImagen(coleccion, id, nombreArchivo)) {
            return res.status(500).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        // Confirmación de upload exitoso
        res.status(200).json({
            ok: true,
            msg: 'uploads',
            nombreArchivo
        });
    });
}

module.exports = {
    fileUpload,
}