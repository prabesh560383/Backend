import mongoose from "mongoose"
import bcrypt from "bcrypt" //for hashing the password saved in database
import { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2" //need to use this npm module for watch history feature
import jwt from "jsonwebtoken" //need to import this package for JWT


const videoSchema =  new Schema({
    videoFile:{
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps:true
})


videoSchema.plugin(mongooseAggregatePaginate)
 
export const Video = mongoose.model('Video', videoSchema)