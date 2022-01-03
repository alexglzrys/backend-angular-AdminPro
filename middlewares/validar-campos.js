const { request, response } = require("express");
const { validationResult } = require("express-validator");

// Middleware para validación de campos
const validarCampos = (req = request, res = response, next) => {
    // Verificar errores de validación (express-validator)
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    // Validación exitosa, continuamos con el siguiente middleware
    next();
}

module.exports = {
    validarCampos,
}