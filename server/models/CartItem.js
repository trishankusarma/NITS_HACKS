const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    addTo:
    [{
        type:mongoose.Types.ObjectId,
        ref: "Product"
    }],
    saveLater:[{
        type:mongoose.Types.ObjectId,
        ref: "Product"
    }],
    Bought:[{
        type:mongoose.Types.ObjectId,
        ref: "Product"
    }],
},{
    timestamps:true
})

module.exports = User = mongoose.model('Vendor',cartSchema);