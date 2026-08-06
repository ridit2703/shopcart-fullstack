import User from '../models/User.js';

// add product to wishlist
export const addToWishlist=async(req,res)=>{
    try{
        const userId=req.user.id;
        const{productId}=req.params;

        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        //check product exist already

        if(user.wishlist.includes(productId)){
            return res.status(400).json({message:"Product already exist"})
        }
        user.wishlist.push(productId);
        await user.save();
        res.json({message:"product added to wishlist ",wishlist:user.wishlist})


    }
    catch(error){
        res.status(500).json({message:"server error",error:error.message})

    }
}

//get wishlist

export const getWishlist=async(req,res)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId).populate("wishlist");
        res.json({wishlist:user.wishlist})
    


    }
    catch(error){
        res.status(500).json({message:"server error",error:error.message})
    }

}
// Remove product from wishlist

export const removeFromWishlist=async(req,res)=>{
    try{

        const userId=req.user.id;
        const {productId}=req.params;


        const user=await User.findById(userId);


        user.wishlist=user.wishlist.filter(
            (id)=>id.toString() !== productId
        );


        await user.save();


        res.json({
            message:"Product removed from wishlist",
            wishlist:user.wishlist
        })


    }
    catch(error){
        res.status(500).json({
            message:"Server error",
            error:error.message
        })
    }
}