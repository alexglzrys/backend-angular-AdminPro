const express = require('express');
// Agregar las varibles definidas en el archivo .env a las variables de entorno de NodeJS
require('dotenv').config();
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
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});