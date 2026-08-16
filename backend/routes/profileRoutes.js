import express from "express";

import {
    getProfile,
    updateProfile,
    
} from "../controllers/profileController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


// GET PROFILE
router.get("/", protect, getProfile);


// UPDATE PROFILE
router.put("/", protect, updateProfile);


// CHANGE PASSWORD
//router.put("/password", protect, changePassword);


export default router;