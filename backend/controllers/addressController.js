// import Address from '../models/Address.js';

// //save address
// export const saveAddress=async (req,res)=>{
//     try{
//         const address=await Address.create(...req.body,userId: req.user.id);
//         res.json({message:"Address saved successfully",address})

//     }catch(error){
//         res.status(500).json({message:"error saving address",error});
//     }

// }

// //get Address by user id

// export const getAddress=async(req,res)=>{
//     try{
//         const address =await Address.find({
//             userId:req.user.id
//         })
//         res.json(address);

//     }catch(error){
//         res.status(500).json({message:"error fetching address",error});
//     }
// }


import Address from "../models/Address.js";

// Save address
export const saveAddress = async (req, res) => {
  try {
    const address = await Address.create({
      ...req.body,
      userId: req.user.id,
    });

    res.json({
      message: "Address saved successfully",
      address,
    });
  } catch (error) {
    console.error("Save address error:", error);

    res.status(500).json({
      message: "Error saving address",
      error: error.message,
    });
  }
};

// Get logged-in user's addresses
export const getAddress = async (req, res) => {
  try {
    const address = await Address.find({
      userId: req.user.id,
    }).sort({createdAt:-1})

    res.json(address);
  } catch (error) {
    console.error("Get address error:", error);

    res.status(500).json({
      message: "Error fetching address",
      error: error.message,
    });
  }
};