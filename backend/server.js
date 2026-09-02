import "dotenv/config";
import express from  'express'
import cors from 'cors';
import dotenv from 'dotenv'
//import "dotenv/config";

import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from'./routes/cartRoutes.js'
import addressRoutes from './routes/addressRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import { stripeWebhook } from './controllers/stripeWebhookController.js';

const app=express()

app.use(cors());
app.post("/api/payment/webhook",express.raw({type:"application/json"}),stripeWebhook)
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart/",cartRoutes);
app.use("/api/address",addressRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/wishlist",wishlistRoutes)
app.use("/api/profile",profileRoutes)

app.get('/',(req,res)=>{
    res.send('API is running')
});

connectDB();

app.listen(5001,()=>{
    console.log("server is running on port 5001")
})