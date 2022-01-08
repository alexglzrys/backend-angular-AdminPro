const { request, response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async(req = request, res = response) => {
    // Recuperar queryString de ruta (páginación)
    const desde = Number(req.query.desde) || 0;

    // Optimizar las siguientes tareas asincronas (el resultado de una no depende de la otra)
    // No importa quien resuelve primero, una no espera a la otra hasta que termine.
    // cuando tenga las dos promesas resueltas, continua ejecutandose el código (respuesta json)
    const [usuarios, total] = await Promise.all([
        // Recuperar usuarios registrados en base de datos
        // Paginarlos de 5 en 5
        Usuario.find({}, 'nombre email role google img').skip(desde).limit(5),

        // Total de registros
        Usuario.count()
    ]);

    // Recuperar usuarios registrados en base de datos
    // Paginarlos de 5 en 5
    // const usuarios = await Usuario.find({}, 'nombre email role google').skip(desde).limit(5);
    
    // Total de registros
    // const total = await Usuario.count();

    res.status(200).json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async(req = request, res = response) => {
    const { email, password, nombre } = req.body;

    try {
        // Verificar duplicidad de email
        const existeEmail = await Usuario.findOne({email});
        console.log(existeEmail);
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se encuentra en uso por otro usuario'
            });
        }

        // Crear instancia de usuario
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        usuario.password = bcrypt.hashSync(password, salt);
        // Guardar usuario en base de datos
        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            usuario,
            token
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
    }
    
}

const actualizarUsuario = async(req = request, res = response) => {
    // Recuperar parametro enviado en la ruta
    const uid = req.params.id;

    // TODO: Validar token 

    try {
        // Localizar usuario por su id
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuaro con el id especificado'
            });
        }

        // Actualizaciones
        // Me interesa todo menos el password, google e email, por tanto desestructuro
        const { password, google, email, ...campos } = req.body; 

        // Verificar si está actualizando en email
        if (email !== usuarioDB.email) {
            // desea actualizar email, comprobar que no este en uso
            const emailExiste = await Usuario.findOne({ email });
            if (emailExiste) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El nuevo email ya se encuentra en uso por otro usuario'
                });
            }
        }

        // Inyecto en el objeto campos, suarios de Google no pueden actualizar su correo
        if (!usuarioDB.google) {
            campos.email = email;
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Usuarios logeados con cuenta de Google, no pueden actualizar su email'
            });
        }
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
    }
}

const eliminarUsuario = async(req = request, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(uid);
        if (usuarioEliminado) {
            res.status(200).json({
                ok: true,
                uid
            });
        } else {
            res.status(400).json({
                ok: false,
                msg: 'No se encontró el usuario con el ID especificado'
            });
        }
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
}