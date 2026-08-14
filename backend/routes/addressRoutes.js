import express from 'express';
import { saveAddress,getAddress } from '../controllers/addressController.js';
import {protect} from '../middlewares/authMiddleware.js'
const router=express.Router();
router.post('/add',protect,saveAddress);
router.get('/',protect,getAddress)

export default router