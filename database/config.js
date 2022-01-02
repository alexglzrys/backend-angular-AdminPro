const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('DB Online')
    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de inicia la BD');
    }
}

module.exports = {
    dbConnection
};