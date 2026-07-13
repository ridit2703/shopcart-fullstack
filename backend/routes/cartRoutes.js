import express from 'express';
import { updateQuantity,addToCart,removeItem ,getCart} from '../controllers/cartController.js';

const router=express.Router();

//add item to cart
router.post("/add",addToCart);

//remove item 
router.post("/remove",removeItem);

//update quantity
router.post("/update",updateQuantity);

//get user cart
router.get("/:userId",getCart);

export default router;