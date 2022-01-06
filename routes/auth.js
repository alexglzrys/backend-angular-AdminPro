const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    check('email', 'El email es un dato requerido').isEmail().notEmpty(),
    check('password', 'El password es un dato requerido').notEmpty(),
    validarCampos
], login);
router.post('/google', [
    check('token', 'El token de Google es un dato requerido').notEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;