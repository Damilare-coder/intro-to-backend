//This file starts the server
import app from "./config/app.js";
import dotenv from 'dotenv';
import connectDB from './config/database.js'; 
//dotenv allows us to extract and use our environment variables.
// const app = express();

dotenv.config({
  path: './.env'
});

const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
      
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port:
        ${process.env.PORT}`);
      
    });
  
  } catch (error){
    console.log("MongoDb connection failed!!", error);
    
  }
}

startServer();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//   res.json({ message: "Backend is running successfully! 🎉" });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });