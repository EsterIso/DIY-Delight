import express from 'express';
import { getCarById, getCars, updateCar, deleteCar, createCar } from '../controllers/cars.controllers.js';

const router = express.Router();

router.get('/', getCars);

router.get('/:carId', getCarById);

router.post('/', createCar);

router.patch('/:id', updateCar);

router.delete('/:id', deleteCar);

export default router;
