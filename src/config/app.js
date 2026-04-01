// Sets up your Express app

import express from "express";


const app = express(); //create an express app

// this helps our server to parse the json request in GET form from the client
app.use(express.json());

// routes import
import userRouter from '../routes/user.route.js';
// import postRouter from './routes/post.route.js';

// route declaration
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/posts", postRouter);


// example route: http://localhost:5000/api/v1/users/register
export default app;