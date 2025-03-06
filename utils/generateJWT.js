const { sign } = require("jsonwebtoken")

module.exports = async (payload)=>{
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' } )
}