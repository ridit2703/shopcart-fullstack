import express from 'express';
import { placeorder } from '../controllers/OrderController';

const router =express.Router();

router.post('/place',placeOrder);

export default router;