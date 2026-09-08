import express from 'express';
import { placeOrder ,createCheckoutSession} from '../controllers/OrderController.js';
import {protect} from "../middlewares/authMiddleware.js"

const router =express.Router();


router.post('/place',protect,placeOrder);
router.post("/checkout",protect,createCheckoutSession)

export default router;
