const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    nameCar: { type: String, required: true },
    marca: { type: String, required: true },
    ano: { type: String, required: true },
    placa: { type: String, required: true },
    responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;




