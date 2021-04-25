const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
    isConfirmed:{
      type:Boolean,
      default:false
    }
},{
    timestamps:true
})

userSchema.methods.generateAuthToken = async function () {

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

userSchema.statics.findByCredentials = async (email, password) => {

  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return null;
  }
  return user;
};

userSchema.pre('save',async function(next){
   
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10);
    }
    next();
})

module.exports = User = mongoose.model('UserModel',userSchema);