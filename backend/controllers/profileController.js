import User from '../models/User.js';
import bcrypt from 'bcryptjs';

//get user profile

export const getProfile=async (req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(user);

    }
    catch(error){
        res.status(500).json({message:"server error",error:error.message})
    }
}

//update user profile

export const updateProfile=async(req,res)=>{
    try{

        const{name,email}=req.body;
        const user=await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        //check whether email is already used
        if(email && email!==user.email){
            const existingUser=await User.findOne({email,_id:{$ne:req.user.id}})
            if(existingUser){
                return res.status(400).json({
                    message:"email already exists"
                })
            }
            user.email=email;
        }
       if(name){
        user.name=name;
       }
       await user.save();
       res.status(200).json({
        message:"Profile uodated successfully",
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
       })


    }
    
    catch(error){
        res.status(500).json({message:"server error",error:error.message})
    }
}

//change password
export const changePassword = async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword
        } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Current password and new password are required"
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check old password
        const passwordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message: "Password changed successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};