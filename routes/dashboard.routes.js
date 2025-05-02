const express = require('express');
const router = express.Router();
// const verifyToken = require('../middlewares/verifyToken');
// const {ADMIN, MANGER} = require('../utils/userRols');
const { getAllAdmins } = require('../controller/dashboard.controller');



router.route('/').get( getAllAdmins)


module.exports = router;