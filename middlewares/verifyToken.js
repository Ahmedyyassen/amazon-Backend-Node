const { verify } = require('jsonwebtoken');
const asyncWrapper = require('./asyncWrapper');
const appError = require('../utils/AppError');
const httpStatus = require('../utils/httpStatusText');

const verifyToken = asyncWrapper(
    async(req, res, next)=>{
    const authToken = req.headers['authorization']
                    || req.headers['Authorization']
                    || req.cookies.token;
    if (!authToken) {
        const error = appError.create("You are not authenticated", 401, httpStatus[401]);
        return next(error);
    }
    let token = authToken;
    if (token.startsWith('Bearer ')) {
        token = authToken.split(' ')[1];
    }
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            const error = appError.create("Token is invalid", 401, httpStatus[401]);
            return next(error);
        }        
        req.currentUser = decoded;
        next();
    })
})
module.exports = verifyToken;