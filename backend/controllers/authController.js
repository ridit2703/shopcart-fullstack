import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

//Signupuser
export const signupUser=async(req,res)=>{
    try{

        const{name,email,password}=req.body;
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:"User already exist"})
        }
        //HashPassword
        const hashPassword=await bcrypt.hash(password,10);

        //create user

        await User.create({
            name,
            email,
            password:hashPassword
        })
        res.json({message:"user registeredn successfully"})



    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message})

    }
}

//login user

export const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;

        //check if user exist already
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        //compare password 
        const match=await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(400).json({message:"Invalid credentials"})

        }
        // generate JWT Tokens
        const token=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        res.json({
            message:`${user.name} loggedIn successfully`,
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }
            
        })




    }
    catch(error){
        res.status(500).json({message:"server error",error:error.message})
    }
}
