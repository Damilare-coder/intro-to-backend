// It connects the backend to the DB
import dotenv from "dotenv";
import mongoose from "mongoose"
// mongoose helps us talk to the database (MongoDB) and also specifies the type of datasets the DB allows.

dotenv.config();

const connectDB = async () => {
    try{
        const mongoURI = process.env.MONGODB_URL;

        if (!mongoURI) {
        throw new Error("MONGODB_URI is not defined in .env file");
        }

        const connectionInstance = await mongoose.connect(mongoURI);
        console.log(`\n MongoDB connected !!!
            ${connectionInstance.connection.host}`)
    
    
        }catch (error){
            console.log("MongoDB connection failed", error);
            process.exit(1)
    }
} 

export default connectDB;