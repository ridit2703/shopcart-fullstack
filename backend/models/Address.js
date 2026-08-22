// import mongoose from "mongoose";
// const addressSchema=new mongoose.Schema({
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         required:true,
//         ref:'User'
//     },
//     fullName:String,
//     phone:String,
//     addressLine:String,
//     city:String,
//     state:String,
//     postalCode:String,
//     country:String,
//     pincode:String
// },{
//     timestamps:true
// });
// export default mongoose.model('Address',addressSchema);

import mongoose from 'mongoose';

const addressSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    fullName:{
        type:String,
        required:[true,"full nameis required"],
        trim:true,
        minlenght:[2,"fullname must be at least 2 characters"],
        maxlength:[50,"fullname can't exceed 50 characters "]
    },
    phone:{
        type:String,
        required:[true,"Phone number is required"],
        trim:true,
        match:[/^[6-9]\d{9}$/,"Please entera valid 10-digit indian number "]
    },
    city:{
        type:String,
        required:[true,"City is required"],
        trim:true,
        minlenght:[2,"City must be at least 2 characters "],
        maxlenght:[50,"City can't exceed 50 characters"]
    },
    state:{
        type: String,
      required: [true, "State is required"],
      trim: true,
      minlength: [2, "State must be at least 2 characters"],
      maxlength: [50, "State cannot exceed 50 characters"],
    },
    pincode:{
        type: String,
      required: [true, "Pincode is required"],
      trim: true,
      match: [
        /^[1-9][0-9]{5}$/,
        "Please enter a valid 6-digit pincode",
      ],
    },
    country:{
        type:String,
        default:"India",
        trim:true
    }
},{timestamps:true,});
export default mongoose.model("Address", addressSchema);