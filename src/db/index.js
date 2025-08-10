import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB =  async () =>{
    try {

      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      console.log('MONGO DB Connected!!')
      console.log('Connection Instance: ', connectionInstance.connection.host)
        
    } catch (error) {
        console.log('DB connection Error')
        process.exit(1)
        
    }
}



export default connectDB


