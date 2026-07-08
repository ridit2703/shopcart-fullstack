import mongoose from 'mongoose';

const connectDB=async()=>{
    try{ 
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected Successfully")
    }
    catch(error){
        console.log(`Eroor:${error.message}`)
    }
}
export default connectDB