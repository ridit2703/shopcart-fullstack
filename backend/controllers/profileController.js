// import User from '../models/User.js';
// import bcrypt from 'bcryptjs';

// //get user profile

// export const getProfile=async (req,res)=>{
//     try{
//         const user=await User.findById(req.user.id).select("-password");
//         if(!user){
//             return res.status(404).json({message:"User not found"})
//         }
//         res.status(200).json(user);

//     }
//     catch(error){
//         res.status(500).json({message:"server error",error:error.message})
//     }
// }

// //update user profile

// export const updateProfile=async(req,res)=>{
//     try{

//         const{name,email}=req.body;
//         const user=await User.findById(req.user.id);

//         if(!user){
//             return res.status(404).json({message:"User not found"})
//         }

//         //check whether email is already used
//         if(email && email!==user.email){
//             const existingUser=await User.findOne({email,_id:{$ne:req.user.id}})
//             if(existingUser){
//                 return res.status(400).json({
//                     message:"email already exists"
//                 })
//             }
//             user.email=email;
//         }
//        if(name){
//         user.name=name;
//        }
//        await user.save();
//        res.status(200).json({
//         message:"Profile uodated successfully",
//         user:{
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role
//         }
//        })


//     }
    
//     catch(error){
//         res.status(500).json({message:"server error",error:error.message})
//     }
// }

// //change password
// export const changePassword = async (req, res) => {
//     try {
//         const {
//             currentPassword,
//             newPassword
//         } = req.body;

//         if (!currentPassword || !newPassword) {
//             return res.status(400).json({
//                 message: "Current password and new password are required"
//             });
//         }

//         const user = await User.findById(req.user.id);

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }

//         // Check old password
//         const passwordMatch = await bcrypt.compare(
//             currentPassword,
//             user.password
//         );
//         if (!passwordMatch) {
//             return res.status(400).json({
//                 message: "Current password is incorrect"
//             });
//         }

//         // Hash new password
//         const hashedPassword = await bcrypt.hash(
//             newPassword,
//             10
//         );

//         user.password = hashedPassword;

//         await user.save();

//         res.status(200).json({
//             message: "Password changed successfully"
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Server error",
//             error: error.message
//         });
//     }
// };


import User from "../models/User.js";
import Address from "../models/Address.js";


// Get Profile
export const getProfile = async (req, res) => {
    try {

        const user = await User
            .findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const address = await Address.findOne({
            userId: req.user.id
        });


        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            address: address || null
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


// Update Profile
export const updateProfile = async (req, res) => {
    try {

        const {
            name,
            email,
            address
        } = req.body;


        // Find User
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        // Check email
        if (email && email !== user.email) {

            const emailExists = await User.findOne({
                email,
                _id: { $ne: req.user.id }
            });

            if (emailExists) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            user.email = email;
        }


        // Update name
        if (name) {
            user.name = name;
        }


        // IMPORTANT:
        // role is NOT updated here


        await user.save();


        // Find existing address
        let userAddress = await Address.findOne({
            userId: req.user.id
        });


        if (userAddress) {

            // Update existing address

            userAddress.fullName = address.fullName;
            userAddress.phone = address.phone;
            userAddress.addressLine = address.addressLine;
            userAddress.city = address.city;
            userAddress.state = address.state;
            userAddress.postalCode = address.postalCode;
            userAddress.country = address.country;

            await userAddress.save();

        }
        else {

            // Create address if not exists

            userAddress = await Address.create({
                userId: req.user.id,
                fullName: address.fullName,
                phone: address.phone,
                addressLine: address.addressLine,
                city: address.city,
                state: address.state,
                postalCode: address.postalCode,
                country: address.country
            });

        }


        res.status(200).json({

            message: "Profile updated successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },

            address: userAddress
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};