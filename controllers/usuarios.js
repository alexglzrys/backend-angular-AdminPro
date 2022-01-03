const { request, response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async(req = request, res = response) => {
    // Recuperar usuarios registrados en base de datos
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.status(200).json({
        ok: true,
        usuarios
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

        // Inyecto en el objeto campos, el email
        campos.email = email;

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