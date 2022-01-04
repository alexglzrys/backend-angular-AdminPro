const { Router } = require('express');
const { fileUpload } = require('../controllers/uploads');

const router = Router();

router.put('/:coleccion/:id', fileUpload);

module.exports = router;