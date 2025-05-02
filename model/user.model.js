const { Schema, model } = require('mongoose');
const {ADMIN, MANGER, USER} = require('../utils/userRols');
const { isEmail } = require('validator');

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
    },
    email:{
        type: String,
        required: true,
        validate: [isEmail, "Invalid email format"],
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    token: {
        type: String,
    },
    role:{
        type: String,
        enum: [USER, ADMIN, MANGER],
        default: USER,
    },
    avatar: {
            url:{ type: String, default: process.env.PROFILE_IMAGE  },
            public_id: { type: String, default: null },
      },
      createUserAt: {
        type: Date,
        default: Date.now(),
      }
});

const userModel = model('User', userSchema);

// Export functions
const getAllUsers =    async (data)=> userModel.find(data, {__v: false, token:false});
const getUserByEmail = async(email)=> userModel.findOne({email}, {__v: false, token:false}).exec();
const getUserById =    async(id)=> userModel.findOne({_id: id}, {__v: false, password: false ,token:false}).exec();
const createUser =     async(data)=> new userModel(data);
const saveUser =       async(newUser) => newUser.save();
const deleteUserById = async(id)=> userModel.findOneAndDelete({_id: id});
const updateUser =     async(id, user)=> userModel.updateOne({_id: id}, {$set: {...user} } );

module.exports = {
    userModel,
    getUserByEmail,
    getUserById,
    createUser,
    saveUser,
    deleteUserById,
    updateUser,
    getAllUsers
};

