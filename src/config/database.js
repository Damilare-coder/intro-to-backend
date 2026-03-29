import mongoose from "mongoose"

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connnect
        (`${process.env.MONGODB_URL}`)
        console.log(`\n MongoDB connected !!!
            ${connectionInstance.connectionn.host}`)
    
    
        }catch (error){
            console.log("MongoDB connection failed", error);
            process.exit(1)
    }
} 

export default connectDB;