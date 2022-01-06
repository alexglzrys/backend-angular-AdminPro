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

        myUser = null;

        // Buscar el usuario en la base de datos
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            // Registrar el nuevo usuario con credenciales de Google
            myUser = new Usuario({
                nombre: name,
                email,
                // Colocamos un pass fake, dado que el modelo exige esta info
                // Esto no quiere decir que se puede logear con este pass fake, ya que no esta hasheado
                password: 'usuario@google', 
                img: picture,
                google: true
            })
        } else {
            // Usuario existe, es decir ya se registro previamente de forma manual (email / password)
            // Quizá ya había accedido previamente mediante autenticación de google
            myUser = usuarioDB;
            myUser.google = true;
        }

        // Guardar el usuario en base de datos.
        // Para usuarios logeados anteriormente, se actualiza su registro a acceso con Google = true
        await myUser.save();

        // Generar el Token JWT que le da acceso al usuario a mi App
        const token = await generarJWT(myUser.id);

        res.status(200).json({
            ok: true,
            token
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