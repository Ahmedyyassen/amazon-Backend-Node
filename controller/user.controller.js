const asyncWrapper = require('../middlewares/asyncWrapper');
const { getUserByEmail, createUser, saveUser } = require('../model/user.model');
const appError = require('../utils/AppError');
const status = require('../utils/httpStatusText');
const generateJWT = require('../utils/generateJWT');
const { hash, compare } = require('bcryptjs');

const register = asyncWrapper(
    async(req, res, next)=>{
        const { username, email, password, role } = req.body;
        if(!username ||!email ||!password){
            const error = appError.create("All fields are required", 203, status[203]);
            return next(error);
        }
        const isExist = await getUserByEmail(email);
        if (isExist) {
            const error = appError.create("User already exist", 400, status[400]);
            return next(error);
        }
        const hashedPassword = await hash(password, 10);

        const newUser = createUser({
            username,
            email,
            password: hashedPassword,
            role
        })
        const token = await generateJWT({ id: newUser._id, email, role });
        newUser.token = token;
        await saveUser(newUser);
        res.status(201).json({status: status[201],message: "User registered successfully", data: {newUser} })
    })



const login = asyncWrapper(
    async(req, res, next)=>{
        const { email, password } = req.body;
        if(!email || !password){
            const error = appError.create("All fields are required", 203, status[203]);
            return next(error);
        }
        const user = await getUserByEmail(email);        
        if(!user){
            const error = appError.create("User not found", 404, status[404]);
            return next(error);
        }
        const isMatch = await compare(password, user.password);
        
        if(!isMatch){
            const error = appError.create("Password is incorrect", 401, status[401]);
            return next(error);
        }
        if (user && isMatch) {            
            const token = await generateJWT({ id: user._id, email, role:user.role });
            const tokenOption = { httpOnly: true, secure: true };
            res.cookie('token', token, tokenOption).status(200)
            .json({status: status[200], message: "User logged in successfully", data: {token} })
        }else{
            const error = appError.create("Invalid credentials", 500, status[500]);
            return next(error);
        }
    })
const getUser = asyncWrapper(
    async(req, res, next)=>{
        const user = await getUserByEmail(req.currentUser.email);
        if(!user){
            const error = appError.create("User not found", 404, status[404]);
            return next(error);
        }
        res.status(200).json({ status: status[200], message: "User fetched successfully", data: {user} })
    })
    
const logout = asyncWrapper(
    async(req, res, next)=>{
        res.clearCookie('token').status(200)
       .json({status: status[200], message: "User logged out successfully" })
    })


module.exports = {
    register,
    login,
    getUser,
    logout
}