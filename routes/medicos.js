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
    validarCampos
], crearMedico);
router.put('/:id', actualizarMedico);
router.delete('/:id', eliminarMedico);

module.exports = router;