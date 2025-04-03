const Car = require('../models/car');


// Criar nova plantação
exports.createCar = async (req, res) => {
    try {
        const { nameCar, marca, ano, placa, responsible } = req.body;
        const car = new Car({ nameCar, marca, ano, placa, responsible });
        
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



// Listar todas as plantações
exports.getAllCars = async (req, res) => {  // Renomeado para getAllCars (mais descritivo)
    try {
        const cars = await Car.find().populate('responsible', 'name');
        res.status(200).json(cars);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id).populate('responsible', 'name');
        if (!car) {
            return res.status(404).json({ message: 'Carro não encontrado' });
        }
        res.status(200).json(car);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar plantação
exports.updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nameCar, marca, ano, placa, responsible } = req.body;

        const updatedCar = await Car.findByIdAndUpdate(id, { nameCar, marca, ano, placa, responsible }, { new: true });
        if (!updatedCar) return res.status(404).json({ message: 'Carro não encontrado' });

        res.status(200).json(updatedCar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir plantação
exports.deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) return res.status(404).json({ message: 'Carro não encontrado' });

        res.status(200).json({ message: 'Carro excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
