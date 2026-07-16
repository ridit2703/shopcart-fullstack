import Address from '../models/Address';

//save address
export const saveAddress=async (req,res)=>{
    try{
        const address=await Address.create(req.body);
        res.json({message:"Address saved successfully",address})

    }catch(error){
        res.status(500).json({message:"error saving address",error});
    }

}

//get Address by user id

export const getAddress=async(req,res)=>{
    try{
        const address =await Address.find({
            userId:req.params.userId
        })
        res.json(address);

    }catch(error){
        res.status(500).json({message:"error fetching address",error});
    }
}


