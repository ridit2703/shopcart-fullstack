import mongoose from 'mongoose';
const OrderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            },
            quantity:Number,
            prices:Number
        }
    ],
    address:{
        fullName:String,
        phone:String,
        addressLine:String,
        city:String,
        state:String,
        pincode:String,

    },
    totalAmount:Number,
    paymentMethod:{
        type:String,
        default:'COD'
    },
    status:{
        default:'Placed'
    },timestamps:true
});
export default mongoose.model("Order",orderSchema)