const { request, response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");

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

        res.status(200).json({
            ok: true,
            usuario
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
    }
    
}

module.exports = {
    getUsuarios,
    crearUsuario
}