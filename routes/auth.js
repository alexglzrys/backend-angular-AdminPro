const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    check('email', 'El email es un dato requerido').isEmail().notEmpty(),
    check('password', 'El password es un dato requerido').notEmpty(),
    validarCampos
], login);

module.exports = router;