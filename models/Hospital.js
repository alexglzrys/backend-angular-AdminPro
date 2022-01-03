const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        // Relacionar este documento con Otro Schema (un hospital es registrado por un usuario)
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}, 
{ 
    // El nombre de mi colección será hospitales y no hospitals
    collection: 'hospitales'
});

// Evitar mandar el __v al momento de consultar un modelo
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Hospital', HospitalSchema);