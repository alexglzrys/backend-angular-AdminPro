const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', getMedicos);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del médico es un dato requerido').notEmpty(),
    check('hospital', 'El hospital asociado es un dato requerido').notEmpty(),
    // Debe ser un id de documento MongoDB válido
    check('hospital', 'El hospital debe ser un dato válido').isMongoId(),
    validarCampos
], crearMedico);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del médico es un dato requerido').notEmpty(),
    check('hospital', 'El hospital asociado es un dato requerido').notEmpty(),
    check('hospital', 'El hospital debe ser un dato válido').isMongoId(),
    validarCampos
], actualizarMedico);
router.delete('/:id', validarJWT, eliminarMedico);

module.exports = router;