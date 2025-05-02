const express = require('express');
const router = express.Router();
const { register, login, getUser, logout } = require('../controller/auth.controller');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/imageHundler');
const { editProfilePhoto, updateUserFn } = require('../controller/user.controller');

router.route('/register').post( upload.single('avatar') ,register)
router.route('/login').post(login);
router.route('/getUser').get(verifyToken, getUser );
router.route('/logout').post(verifyToken, logout );


router.route('/editProfilePhoto').post(verifyToken, upload.single('image_profile') , editProfilePhoto);
router.route('/editData').post(verifyToken, updateUserFn)

module.exports = router;