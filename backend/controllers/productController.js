import Product from "../models/product.js";


//create product
export const createProduct =async (req,res)=>{
    try{
        const product =await Product.create(req.body);
        res.json({
            message:"Product Created Successfully",
            product,
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"server error",error})

    }
}

//get all product 

export const getProducts=async(req,res)=>{
    try{
        const {search,category}=req.query;
        let filter={};
        if(search){
            filter.title={$regex: search,$options:'i'};
        }
        if(category){
            filter.category=category;
        }

        const products=await Product.find(filter).sort({createdAt:-1});
        res.json(products);

    }
    catch(error){
        res.status(500).json({message:"server error",error});
    }
}

//update a product 
export const updateProduct=async(req,res)=>{
    try{
        const updated=await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json({
            message:"Product Updated Successfully",
            updated
        });

    }
    
    catch(error){
        res.status(500).json({message:"server error",error});
    }
}

//delete product

export const deleteProduct=async(req,res)=>{

    try{
        await Product.findByIdAndDelete(req.params.id);
        res.json({message:"Product Deleted Successfully"})

    }
    catch(error){
        res.status(500).json({message:"server error",error});
    }

}

