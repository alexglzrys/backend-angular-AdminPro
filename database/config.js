const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect('mongodb+srv://MEAN_Angular_Avanzado:nUmC2UbeVdglHWdL@clustertraining.sjd20.mongodb.net/hospitalMean');
        console.log('DB Online')
    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de inicia la BD');
    }
}

module.exports = {
    dbConnection
};