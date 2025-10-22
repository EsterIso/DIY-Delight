import express from 'express';
import { getExteriors, getInteriors, getRoofs, getWheels } from '../controllers/features.controller.js';

const router = express.Router();

router.get('/exterior', getExteriors);

router.get('/interior', getInteriors);

router.get('/roof', getRoofs);

router.get('/wheels', getWheels);

export default router;