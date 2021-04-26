const express = require('express');
const router = new express.Router();
const {userContoller} = require('../controllers/user');
const { userAuth } = require('../middleware/');
const {upload}=require("../utils");


router.get( '/' , userAuth("User") ,userContoller.get_profile );
router.get('/logout',userAuth("User"),userContoller.logout);

router.post('/register',userContoller.registration);
router.post('/login',userContoller.login);

router.patch('/uploadProfile', upload.single('upload_profile') , userAuth("User") , userContoller.update_profile );

router.get( '/test' ,(req,res)=>{
    res.json({
        message:"done"
    })
});

module.exports = router;