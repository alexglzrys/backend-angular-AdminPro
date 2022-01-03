const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Declaración de rutas principales de la aplicación
router.get('/', getUsuarios);
// Especificar los campos que se deben validar antes de registrar un usuario (express-validator)
router.post('/', [
    check('nombre', 'El nombre es un dato requerido').notEmpty(),
    check('email', 'El email es un dato requerido').notEmpty().isEmail(),
    check('password', 'El password es un dato requerido').notEmpty(),
    validarCampos
], crearUsuario);


module.exports = router;