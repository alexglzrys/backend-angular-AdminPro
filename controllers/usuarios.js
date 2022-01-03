const { request, response } = require("express");
const { validationResult } = require("express-validator");
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

    // Verificar errores de validación (express-validator)
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

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

        // Guardar usuario en base de datos
        const usuario = new Usuario(req.body);
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