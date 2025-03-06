const express = require('express');
const router = express.Router();
const { register, login, getUser, logout } = require('../controller/user.controller');
const verifyToken = require('../middlewares/verifyToken');

router.route('/register').post(register)
router.route('/login').post(login);
router.route('/getUser').get(verifyToken, getUser);
router.route('/logout').post(verifyToken, logout);

module.exports = router;