const { Router } = require('express');
const { buscadorGeneral, buscarPorColeccion } = require('../controllers/buscador.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();

router.get('/coleccion/:coleccion/:busqueda', validarJWT, buscarPorColeccion);
router.get('/:busqueda', validarJWT, buscadorGeneral);

module.exports = router;