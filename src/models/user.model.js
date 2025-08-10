import mongoose from "mongoose"
import { Schema } from "mongoose"
import bcrypt from "bcrypt" //for hashing the password saved in database
import jwt from "jsonwebtoken" //need to import this package for JWT

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
    timestamps:true
})


userSchema.pre("save", async function (next){            //dont use arrow function here because this callback need context /value of 'this'
    if(!this.isModified("password"))   return next();      //need to excrypt passowrd only once..
    this.password = await bcrypt.hash(this.password, 10)
    next()
}) 

userSchema.methods.isPasswordCorrect =  async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){          //This JWT will be given to the user when they log in successfully, so they can prove who they are in future requests — without having to send their password again.
return  jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
process.env.ACCESS_TOKEN_SECRET,
{
   expiresIn: process.env.ACCESS_TOKEN_EXPIRY
})
}


userSchema.methods.generateRefreshToken = function(){          //This JWT will be given to the user when they log in successfully, so they can prove who they are in future requests — without having to send their password again.
return  jwt.sign({
        _id: this._id,
    },
process.env.REFRESH_TOKEN_SECRET,
{
   expiresIn: process.env.REFRESH_TOKEN_EXPIRY
})
}


export const User = mongoose.model('User', userSchema)

