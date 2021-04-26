const express = require('express');
const router = new express.Router();

const multer = require("multer");

const {UserController} = require('../controllers/user');

const { userAuth } = require('../middleware');

const upload = multer({

    fileFilter(req, file, cb) {

         cb(undefined, true);
    }
});

router.get( '/' , userAuth , UserController.user_get );

router.post('/register',UserController.user_register);

router.post('/login',UserController.user_login);

router.get('/logout',userAuth, UserController.user_logout);

router.patch('/uploadProfile', upload.single('upload_profile') , userAuth , UserController.profile_upload );

module.exports = router;