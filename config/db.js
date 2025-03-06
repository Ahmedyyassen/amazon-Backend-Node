const { connect } = require('mongoose');

const connectDB = async () => {
    try{
        await connect(process.env.MONGODB_URI);
    }catch(error){
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = connectDB;