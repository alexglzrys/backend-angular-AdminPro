const { Router } = require('express');
const { fileUpload, getImagen } = require('../controllers/uploads');

const router = Router();

// Subir archivo
router.put('/:coleccion/:id', fileUpload);
// Ver contenido de imagen
router.get('/:coleccion/:archivo', getImagen);

module.exports = router;