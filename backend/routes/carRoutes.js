const express = require('express');
const router = express.Router();
const { createCar, getAllCars, getCarById,  updateCar, deleteCar } = require('../controllers/carController');

// Rotas de carros
router.post('/', createCar);
router.get('/', getAllCars);  // Atualizado para usar getAllCars
router.get('/:id', getCarById);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;
