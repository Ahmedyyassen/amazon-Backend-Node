const asyncWrapper = require("../middlewares/asyncWrapper");
const { getUserByEmail, updateUser } = require("../model/user.model");
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/AppError");




const editProfilePhoto = asyncWrapper(
    async (req, res, next) => {
        
        const { email } = req.currentUser;
        const user = await getUserByEmail(email);
    
        if(!user){
            const error = appError.create( "User not found", 404, httpStatusText[404])
            return next(error);
        }
        if(req.file){
            await cloudinaryRemoveImage(user.avatar.public_id); 
            const image = await cloudinaryUploadImage(req.file);
            user.avatar = { url: image.secure_url, public_id: image.public_id };
              const updatedUser = await updateUser(user._id, user);
              res.status(200).json({ status: httpStatusText[200] ,message: "Profile photo updated successfully", data: {user: updatedUser} });
          }
})

const updateUserFn = asyncWrapper(
    async (req, res, next) => {
        const { username } = req.body;
        const { email } = req.currentUser;
        const user = await getUserByEmail(email);
    
        if(!user){
            const error = appError.create( "User not found", 404, httpStatusText[404])
            return next(error);
        }
        user.username = username;
    
        const updatedUser = await updateUser(user._id, user);
        res.status(200).json({ status: httpStatusText[200], message: "User updated successfully", data: { user: updatedUser } });
    }
)

module.exports = { editProfilePhoto, updateUserFn };