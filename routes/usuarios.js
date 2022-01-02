const { Router } = require('express');
const { getUsuarios } = require('../controllers/usuarios');

const router = Router();

// Declaración de rutas principales de la aplicación
router.get('/', getUsuarios);


module.exports = router;