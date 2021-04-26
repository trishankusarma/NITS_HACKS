const { User } = require('../models');

const utils = require('../utils');

exports.user_get = async (req,res)=>{
    res.json({ user:req.user , error:null });
}

const options = {
    expires: new Date( Date.now() + 14*1000*60*60 ),
    secure:false,
    httpOnly: false
}

//post register
exports.user_register = async (req,res)=>{
    const { name , email , phoneNo , password } = req.body;

    try {
        const user = await User.findOne({email});

        if(user){
            res.json({user:null , error:'Email Already Exists'});
        }
    
        const newUser = new User({
            name , email , phoneNo , password
        })

        const token = await newUser.generateAuthToken();

        res.cookie('authorization', token, options);

        await newUser.save();

        // const url = `http://localhost:3000/confirmation/${token}`;

        // utils.sendEmail(email, url , 'Confirm Email');
            
        res.json({ user:newUser , error:null , token });

    } catch (error) {
        
        res.json({ user:null , error:'Internal Server Error' });
    }
}

//post login
exports.user_login = async (req,res)=>{
    const { email ,  password } = req.body;
    
    try {
        const user = await User.findByCredentials( email, password );
        
        if(!user){
        
            res.json({user:null , error:"Invalid credentials" });
        }
        
        const token = await user.generateAuthToken();

        res.cookie('authorization', token, options)
        
        res.json({ user , error:null , token });
    
    } catch (error) {
    
        res.json({ user:null , error:'Internal Server Error' });
    }
}

//post logout
exports.user_logout = async (req, res) => {
    try {
        res.clearCookie('authorization');

        res.json({user:null,error:null});
        
    } catch (error) {
        res.json({user:null,error:'Internal Server Error'});
    }
}

//profile upload
exports.profile_upload =  async (req,res)=>{
    
    try {
        const user = req.user;

        console.log(user);

        user.name = req.body.name;
        user.email = req.body.email;
        user.phoneNo = req.body.phoneNo;

        if(req.file!==undefined){
            user.profileType = req.file.mimetype;
            user.profile = req.file.buffer;
        }

        console.log(user);

        await user.save();
        
        res.json({ user , error:null });  

      } catch (error) {
        res.json({ user:null , error:'Internal Server Error' });         
      }
}