import express from 'express';

import { addToWishlist,getWishlist,removeFromWishlist } from '../controllers/wishlistController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router=express.Router();

//add product to wishlist
router.post("/:productId",protect,addToWishlist);

//get wishlist
router.get("/",protect,getWishlist);

//remove wishlist item
router.delete("/:productId",protect,removeFromWishlist);

export default router;