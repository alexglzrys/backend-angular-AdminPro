const { Router } = require('express');
const { getUsuarios, crearUsuario } = require('../controllers/usuarios');

const router = Router();

// Declaración de rutas principales de la aplicación
router.get('/', getUsuarios);
router.post('/', crearUsuario);


module.exports = router;