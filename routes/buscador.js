const { Router } = require('express');
const { buscadorGeneral } = require('../controllers/buscador.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();

router.get('/:busqueda', validarJWT, buscadorGeneral);

module.exports = router;