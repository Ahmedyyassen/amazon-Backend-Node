const cloudinary = require('cloudinary').v2;
const { join } = require('path');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload image to cloudinary
const cloudinaryUploadImage = async(file)=>{
    try {
        const imagePath = join(__dirname, `../uploads/${file.filename}`);
        const data = await cloudinary.uploader.upload(imagePath,{
            resource_type: 'auto'
        });
        fs.unlinkSync(imagePath);
        return data;
    } catch (error) {
        return error;
    }
}

const cloudinaryRemoveImage = async(imagePublicID)=>{
    try {
        const result = await cloudinary.uploader.destroy(imagePublicID);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = { cloudinaryUploadImage, cloudinaryRemoveImage };