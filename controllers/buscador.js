const { request, response } = require("express");
const Hospital = require("../models/Hospital");
const Medico = require("../models/Medico");
const Usuario = require("../models/Usuario");

const buscadorGeneral = async(req = request, res = response) => {
    const busqueda = req.params.busqueda;

    // Expresion regular: LIKE
    const regexBusqueda = new RegExp(busqueda, 'i');

    // Optimizar tareas asincronas (no hay dependencia entre ellas)
    const [usuarios, medicos, hospitales] = await Promise.all([
        // Buscar usuarios
        Usuario.find({ nombre: regexBusqueda }),
        // Buscar médicos
        Medico.find({ nombre: regexBusqueda }),
        // Buscar hospitales
        Hospital.find({ nombre: regexBusqueda} )
    ]);

    // Buscar usuarios
    // const usuarios = await Usuario.find({ nombre: regexBusqueda });
    // Buscar médicos
    // const medicos = await Medico.find({ nombre: regexBusqueda });
    // Buscar hospitales
    // const hospitales = await Hospital.find({ nombre: regexBusqueda} )

    res.status(200).json({
        ok: true,
        usuarios,
        medicos,
        hospitales,
        busqueda
    });
}

const buscarPorColeccion = async(req = request, res = response) => {
    // 
    const coleccion = req.params.coleccion;
    const busqueda = req.params.busqueda;

    // Expresion regular: LIKE
    const regexBusqueda = new RegExp(busqueda, 'i');

    // Buscar en la colección especificada
    data = null;

    switch(coleccion) {
        case 'usuarios':
            data = await Usuario.find({ nombre: regexBusqueda});
            break;
        case 'medicos':
            data = await Medico.find({ nombre: regexBusqueda })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regexBusqueda })
                                 .populate('usuario', 'nombre img');
            break;
        default: 
            return res.status(400).json({
                ok: false,
                msg: 'No existe la colección especificada, posibles colecciones de búsqueda son: usuarios|medicos|hospitales',
                coleccion
            });
    }

    // Mandar los resultados encontrados
    res.status(200).json({
        ok: true,
        coleccion,
        resultados: data
    });
}

module.exports = {
    buscadorGeneral,
    buscarPorColeccion
}