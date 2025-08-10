import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import app from './app.js';

dotenv.config({ path: './.env' })


 connectDB()
        .then(()=>{
            app.listen(process.env.PORT || 8000, ()=>{
                console.log('Server is currently listening at port', process.env.PORT);
                app.on('error', ()=>{console.log('There is some error in relation to express server')})
            })
        })
        .catch((error)=>{console.log('There is something wrong' + error)})



 

 
   const asyncHandler = async(fn) =>
    (req,res) =>{fn(req, res)}
   


   


