const express = require('express');
const router = new express.Router();

const multer = require("multer");

const userController = require('../controllers/user');

const { userAuth } = require('../middleware');

const upload = multer({

    fileFilter(req, file, cb) {

         cb(undefined, true);
    }
});

router.get( '/' , userAuth , userController.user_get );

router.post('/register',userController.user_register);

router.post('/login',userController.user_login);

router.get('/logout',userAuth, userController.user_logout);

router.patch('/uploadProfile', upload.single('upload_profile') , userAuth , userController.profile_upload );

module.exports = router;