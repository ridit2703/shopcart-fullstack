// import mongoose from 'mongoose';
// const OrderSchema=new mongoose.Schema({
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         required:true,
//         ref:'User'
//     },
//     items:[
//         {
//             product:{
//                 type:mongoose.Schema.Types.ObjectId,
//                 required:true,
//                 ref:'Product'
//             },
//             quantity:Number,
//             prices:Number
//         }
//     ],
//     address:{
//         fullName:String,
//         phone:String,
//         addressLine:String,
//         city:String,
//         state:String,
//         pincode:String,

//     },
//     totalAmount:{
//         type:Number,
//         required:true
//     },
//     paymentMethod:{
//         type:String,
//         enum:["COD","STRIPE"],
//         default:"COD"
//     },
//     paymentStatus:{
//         type:String,
//         enum:["pending","paid","failed"],
//         default:"pending"

//     },
//       stripeSessionId: {
//             type: String,
//             default: null,
//         },

//     stripePaymentIntentId: {
//             type: String,
//             default: null,
//         },

//     status:{
//         type: String,
//         default:'Placed'
//     }
// },{timestamps:true});
// export default mongoose.model("Order",OrderSchema)

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },

                // Keep "prices" because your existing COD data uses it
                prices: {
                    type: Number,
                    required: true,
                },
            },
        ],

        address: {
            fullName: String,
            phone: String,
            addressLine: String,
            city: String,
            state: String,
            pincode: String,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "STRIPE"],
            default: "COD",
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },

        stripeSessionId: {
            type: String,
            default: null,
        },

        stripePaymentIntentId: {
            type: String,
            default: null,
        },

        status: {
            type: String,
            default: "Placed",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Order", OrderSchema);
