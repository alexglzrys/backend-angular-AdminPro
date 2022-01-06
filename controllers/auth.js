const { request, response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

        // Generar JWT
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            token
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
    }
}

const googleSignIn = async(req = request, res = response) => {

    const googleToken = req.body.token;

    try {
        // Verificar token de google
        const {name, email, picture } = await googleVerify(googleToken);

        res.status(200).json({
            ok: true,
            msg: 'Google Sign in',
            name,
            email,
            picture
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'El token de Google es incorrecto'
        });
    }
    
}

module.exports = {
    login,
    googleSignIn,
}