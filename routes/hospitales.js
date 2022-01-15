const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospital, actualizarHospital, eliminarHospital, getAllHospitales } = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getHospitales);
router.get('/all', getAllHospitales);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del hospital es un dato requerido').notEmpty(),
    validarCampos
], crearHospital);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del hospital es un dato requerido').notEmpty(),
    validarCampos
], actualizarHospital);
router.delete('/:id', validarJWT, eliminarHospital);

module.exports = router;