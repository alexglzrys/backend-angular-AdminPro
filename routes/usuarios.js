const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarRoleAdministrador, validarRoleAdministradorAndMismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

// Declaración de rutas principales de la aplicación
router.get('/', validarJWT, getUsuarios);
// Especificar los campos que se deben validar antes de registrar un usuario (express-validator)
router.post('/', [
    check('nombre', 'El nombre es un dato requerido').notEmpty(),
    check('email', 'El email es un dato requerido').notEmpty().isEmail(),
    check('password', 'El password es un dato requerido').notEmpty(),
    validarCampos
], crearUsuario);
router.put('/:id', [
    validarJWT,
    //validarRoleAdministrador,   // usuarios administradores pueden actualizar los datos de los usuarios
    validarRoleAdministradorAndMismoUsuario,    // usuarios no administradores solo pueden actualizarse a si mismos, pero no al resto
    check('nombre', 'El nombre es un dato requerido').notEmpty(),
    check('email', 'El email es un dato requerido').notEmpty().isEmail(),
    check('role', 'El role es un dato obligatorio').notEmpty(),
    validarCampos
], actualizarUsuario);
router.delete('/:id', [validarJWT, validarRoleAdministrador], eliminarUsuario);


module.exports = router;