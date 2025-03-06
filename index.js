require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const http = require('http');
const connectDB = require('./config/db');
const app = express();
const userRoutes = require('./routes/user.routes');
const status = require('./utils/httpStatusText');
const cookieParser = require('cookie-parser')
 

// Middleware
app.use(cors({
    // origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/users', userRoutes);

app.all('*', (req, res, next) => {
    req.status(404).json({ status: status[404], message: 'This source is not found' });
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || status[500] , message: error.message || 'Internal Server Error',
        data: null
     });
})
// Database connection
const server = http.createServer(app);
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`MongoDB connected successfully`);
        console.log(`Server running http://localhost:${PORT}`);
    });
});