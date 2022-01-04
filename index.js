// Agregar las varibles definidas en el archivo .env a las variables de entorno de NodeJS
require('dotenv').config();
// Requerir librerías y paquetes
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('./database/config');
const usuarios = require('./routes/usuarios');
const auth = require('./routes/auth');
const hospitales = require('./routes/hospitales');
const medicos = require('./routes/medicos');
const buscador = require('./routes/buscador');
const upload = require('./routes/uploads');

// Base de datos
dbConnection();

// Iniciar el servidor
const app = express();

// Middlewares
app.use(fileUpload());          // Permitir envío de archivos en la petición
app.use(cors());                // Permitir solicitudes de origenes cruzados (importante para APIs)
app.use(express.json());        // Lectura y parseo del body


// rutas
app.use('/api/usuarios', usuarios);
app.use('/api/login', auth);
app.use('/api/hospitales', hospitales);
app.use('/api/medicos', medicos);
app.use('/api/todo', buscador);
app.use('/api/uploads', upload);

// Configuración de puerto
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});