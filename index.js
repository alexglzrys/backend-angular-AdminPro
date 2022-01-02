const express = require('express');
const { dbConnection } = require('./database/config');

// Base de datos
dbConnection();

// Iniciar el servidor
const app = express();

// rutas
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Hola mundo'
    });
});

// Configuración de puerto
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});