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
const getUserByEmail = (email)=> userModel.findOne({email});
const getUserById = (id)=> userModel.findOne({_id: id});
const createUser = (data)=> new userModel(data);
const saveUser = (newUser) => newUser.save();
const deleteUserById = (id)=> userModel.findOneAndDelete({_id: id});
const updateUser = (id, user)=> userModel.findOneAndUpdate(id, user);

module.exports = {
    userModel,
    getUserByEmail,
    getUserById,
    createUser,
    saveUser,
    deleteUserById,
    updateUser
};

