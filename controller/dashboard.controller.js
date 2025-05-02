const asyncWrapper = require("../middlewares/asyncWrapper");
const { getAllUsers } = require('../model/user.model')



const getAllAdmins = asyncWrapper(
    async(req,res, next)=>{
        const users = await getAllUsers({ role: 'ADMIN' });
        console.log(users);
        res.status(200).json({data: {users}})
    }
)
const updateRole = asyncWrapper(
    async(req,res, next)=>{
        
    }
)
const deleteAdmin = asyncWrapper(
    async(req,res, next)=>{
        
    }
)

module.exports = { getAllAdmins }