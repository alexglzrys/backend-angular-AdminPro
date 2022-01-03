const { request, response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");

const login = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        // Localizar usuario por su email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            res.status(400).json({
                ok: false,
                msg: 'Correo electrónico no válido'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida'
            });
        }

        // TODO: Generar JWT

        res.status(200).json({
            ok: true,
            msg: 'login'
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
    }
}

module.exports = {
    login,
}