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
        re: 'Usuario'
    },
    hospital: {
        // Relacionar este documento con Otro Schema (un medico esta relacionado con un Hospital)
        // Declararlo como [{ ... }] si es una relación Uno a muchos
        type: Schema.Types.ObjectId,
        re: 'Hospital'
    }
});

// Evitar mandar el __v al momento de consultar un modelo
MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Medico', MedicoSchema);