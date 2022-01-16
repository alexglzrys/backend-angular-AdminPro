const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuario");

// Solo si el token es válido dejamos pasar al siguiente middleware
const validarJWT = (req= request, res = response, next) => {
    // Leér token
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se envió un token'
        });
    }

    // Verificar token
    try {
        // Si todo es correcto, me interesa obtener el uid que viene en el payload
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        // Guardar el id del usuario en la petición
        req.uid = uid;
        
        next();
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}

const validarRoleAdministrador = async (req = request, res = response, next) => {
    try {
        // Buscar el usuario que se esta logeando
        const usuarioDB = await Usuario.findById(req.uid);
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no localizado'
            });
        }
        if (usuarioDB.role === 'ADMIN_ROLE') {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'El Role no tiene privilegios para realizar esta acción'
            });
        }
    } catch (err) {
        return res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
    }
    
}


const validarRoleAdministradorAndMismoUsuario = async (req = request, res = response, next) => {
    try {
        // Buscar el usuario que se esta logeando
        const usuarioDB = await Usuario.findById(req.uid);
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no localizado'
            });
        }
        // Debe ser administrador O SI NO LO ES, su id debe ser el mismo que del usuario que esta tratando de actualizar
        if (usuarioDB.role === 'ADMIN_ROLE' || req.params.id === req.uid) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'El Role no tiene privilegios para realizar esta acción'
            });
        }
    } catch (err) {
        return res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor'
        });
    }
    
}

module.exports = {
    validarJWT,
    validarRoleAdministrador,
    validarRoleAdministradorAndMismoUsuario
}