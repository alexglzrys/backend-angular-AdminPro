const { Router } = require('express');
const { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require('../controllers/hospitales');

const router = Router();

router.get('/', getHospitales);
router.post('/', crearHospital);
router.put('/:id', actualizarHospital);
router.delete('/:id', eliminarHospital);

module.exports = router;