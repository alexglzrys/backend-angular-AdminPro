const { request, response } = require("express");
const jwt = require('jsonwebtoken');

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
        next();
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validarJWT,
}