import express from 'express';
import { placeOrder } from '../controllers/OrderController.js';
import {protect} from "../middlewares/authMiddleware.js"

const router =express.Router();

router.post('/place',protect,placeOrder);

export default router;