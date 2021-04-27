const express = require('express');
const router = new express.Router();
const { Product } = require('../models');

router.get('/',async(req,res)=>{
    try {
        let products = await Product.find()
                            .sort([['createdAt', -1]])
                            .populate('owner');
  
        res.status(200).json({
          products,
          error: null
        });

      } catch (error) {
        console.log(error);
        errorResConfig(error, res);
      }
})

module.exports = router;