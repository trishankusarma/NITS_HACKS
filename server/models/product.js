const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    productImage:[{
        type:Buffer
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Vendor'
    }
},{
    timestamps:true
})

module.exports = Product = mongoose.model('Product',userSchema);