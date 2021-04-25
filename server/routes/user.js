const express = require('express');
const router = new express.Router();

const userController = require('../controllers/user');

const { userAuth } = require('../middleware');

router.get( '/' , userAuth , userController.user_get );

router.post('/register',userController.user_register);

router.post('/login',userController.user_login);

router.get('/logout',userAuth, userController.user_logout);

module.exports = router;