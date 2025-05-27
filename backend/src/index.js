import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';

import connectDB from './config/db.js';
import router from './routes/task.routes.js';

config();

const app=express();

//MiddleWare
app.use(cors());
app.use(express.json());

//database connection
connectDB();

//routes
// app.get('/', (req, res) => {
//   res.send('Task Manager API is running');
// });

app.use("/",router);



const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Database is successfully connected on ${PORT}`);
    // console.log(Task)
    // console.log(TaskServices);
    // console.log(TaskController);
})