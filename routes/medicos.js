const { Router } = require('express');
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos');


const router = Router();

router.get('/', getMedicos);
router.post('/', crearMedico);
router.put('/:id', actualizarMedico);
router.delete('/:id', eliminarMedico);

module.exports = router;