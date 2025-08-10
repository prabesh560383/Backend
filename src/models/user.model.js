import mongoose from "mongoose"
import { Schema } from "mongoose"

const userSchema = new Schema({
   username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true //for optimizing searching
   },
   email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true  
   },
   fullname: {
    type: String,
    required: true,
    trim: true,
    index: true
   },
   avatar: {
    type: String, //cloudinary url
    required: true 
   },
   coverImage: {
    type: String
   },
   watchHistory: [
    {
        type:Schema.Types.ObjectId,
        ref: 'Video'
    }
   ],
   password: {   
    type: String,
    required: [true, 'Password is required'],  //custom message to show if password is not provided
   },
   refreshToken: {
    type: String,    
   },
}, {
    timestamps:
})

export const User = mongoose.model('User', userSchema)

