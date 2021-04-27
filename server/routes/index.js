const express = require('express');
const router = new express.Router();

const userRouter = require('./user');
const vendorRouter=require("./vendor");
const productRouter = require('./products');

router.use('/user',userRouter);
router.use('/vendor',vendorRouter);
router.use('/products',productRouter);

module.exports = router;