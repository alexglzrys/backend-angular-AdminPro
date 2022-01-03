const jwt = require('jsonwebtoken');
require('dotenv').config();

// Función utilitaria para generar Tokens
const generarJWT = (uid) => {
    // Retornamos una promesa debido a que la librería JWT, trabaja con callbacks
    return new Promise((resolve, reject) => {
        // Payload
        const payload = {
            uid
        };
        // Firmar token
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (err, token) => {
            // Resolver o rechazar promesa
            if (err) {
                reject('Imposible generar el JWT');
            } else {
                resolve(token);
            }
        });
    })
}

module.exports = {
    generarJWT,
}