const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        // Relacionar este documento con Otro Schema (un médico es registrado por un usuario)
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        // Relacionar este documento con Otro Schema (un medico esta relacionado con un Hospital)
        // Declararlo como [{ ... }] si es una relación Uno a muchos
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});

// Evitar mandar el __v al momento de consultar un modelo
MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Medico', MedicoSchema);