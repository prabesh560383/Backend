 import { v2 as cloudinary } from 'cloudinary'
 import fs from "fs"



 cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY
});


const cloudinaryUpload = async (localPath)=>{
    try {
        if(!localPath) return null;
        const response =   await cloudinary.v2.uploader.upload(localPath, {
            resource_type: "auto"
        })
        console.log('file has been uploaded to cloudinary', response.url)
        return response.url
        
    } catch (error) {
        fs.unlinkSync(localPath)  //remove the locally saved temporary file if upload to cloudinary fails
        
    }
}


export {cloudinaryUpload}