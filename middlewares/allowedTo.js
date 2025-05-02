const appError = require('../utils/AppError');
const httpStatus = require('../utils/httpStatusText');
module.exports = (...role)=>{
    return (req, res, next) => {
        if (!role.includes(req.currentUser.role)) {
            const error = appError.create("User not authorized", 401, httpStatus[401] );
            return next(error);
        } 
        next();
    }
}