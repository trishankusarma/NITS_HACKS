const express = require('express');
const router = new express.Router();
const {userContoller} = require('../controllers/user');
const { userAuth } = require('../middleware');
const {upload}=require("../utils");


router.get( '/' , userAuth , userContoller.get_profile );
router.get('/logout',userAuth, userContoller.logout);

router.post('/register',userContoller.registration);
router.post('/login',userContoller.login);

router.patch('/uploadProfile', upload.single('upload_profile') , userAuth , userContoller.update_profile );


module.exports = router;