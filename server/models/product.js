const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
    quantity: {
        type: Number,
        required: true,
        trim: true
      },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    productType:{
        type:String
    },
    productImage:{
        type:Buffer
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Vendor'
    }
},{
    timestamps:true
})

module.exports = Product = mongoose.model('Product',productSchema);