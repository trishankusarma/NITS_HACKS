const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
    phoneNo: {
        type: Number,
        required: true,
        trim: true,
        minlength: 10
      },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },
    password: {
        type: String,
        required: true,
        trim: true
    },
    adress:{
      type:String
    },
    profileType:{
      type:String 
    },
    profile:{
      type:Buffer
    },
    products:[{
      type:mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }],
    long:{
      type:Number
    },
    lat:{
      type:Number
    },
    sellNow:{
      type:Boolean,
      default:false
    }
},{
    timestamps:true
})

vendorSchema.methods.generateAuthToken = async function () {

  const user = this;
  
  const token = await jwt.sign(

     { _id: user._id.toString() },
    
     process.env.TOKEN_SECRET,
     {
      expiresIn: '1d',
     }
  );
  
  return token;
};

vendorSchema.statics.findByCredentials = async (email, password) => {

  console.log("model",Vendor)
  const user = await Vendor.findOne({ email });

  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return null;
  }
  return user;
};

vendorSchema.pre('save',async function(next){
   
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10);
    }
    next();
})

module.exports = Vendor = mongoose.model('Vendor',vendorSchema);