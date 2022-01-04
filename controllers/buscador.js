const { request, response } = require("express");

const buscadorGeneral = (req = request, res = response) => {
    const busqueda = req.params.busqueda;

    res.status(200).json({
        ok: true,
        msg: 'buscador general',
        busqueda
    });
}

module.exports = {
    buscadorGeneral
}