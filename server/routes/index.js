const express = require('express');
const router = new express.Router();

const userRouter = require('./user');
const vendorRouter=require("./vendor");
router.use('/user',userRouter);
router.use('/vendor',vendorRouter);

module.exports = router;