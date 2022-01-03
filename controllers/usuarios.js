const { request, response } = require("express");
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
    // Guardar usuario en base de datos
    const usuario = new Usuario(req.body);
    await usuario.save();

    res.status(200).json({
        ok: true,
        usuario
    });
}

module.exports = {
    getUsuarios,
    crearUsuario
}