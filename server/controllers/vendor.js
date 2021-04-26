const {Vendor,Product,User,CartItem}=require("../models");
const {errorResConfig}=require("../utils")
const nodemailer =require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto =require("crypto");
const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))
const bcrypt=require("bcryptjs")


const VendorContoller={
    // AUTH
    login:(req,res,next)=>{
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
        
            console.log(error);
            errorResConfig(error,res);
        }
    },
    registration:(req,res,next)=>{
        try{
            const { name , email , phoneNo , password } = req.body;
    
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
        

        }
        catch(error){
            console.log(error);
            errorResConfig(error,res);
        }
    },
    logout:(req,res,next)=>{
        try {
            res.clearCookie('authorization');
    
            res.json({user:null,error:null});
            
        } catch (error) {
            console.log(error);
            errorResConfig(error,res);
        }
    },
    // GET
    get_profile:(req,res,next)=>{
        try{
            const data =await Vendor.findById(req.user._id);
            res.status(200).json({
                user:data,
                error:null,
            }) 

        }
        catch(error){
            console.log(error);
            errorResConfig(error,res);
        }
    },
    get_data:(req,res,next)=>{
        try{

            res.status(200).json({
                user:data,
                error:null,
            }) 

        }
        catch(error){
            console.log(error);
            errorResConfig(error,res);
        }
    },
    getAll_products:(req,res,next)=>{
        try{
            const data=await Product.find({
                    ower:req.user._id
            });
            res.status(200).json({
                user:data,
                error:null,
            }) 

        }
        catch(error){
            console.log(error);
            errorResConfig(error,res);
        }
    },
    getOne_product:(req,res,next)=>{
        try{
            const data=await Product.findById(req.params.id);
            
            res.status(200).json({
                user:data,
                error:null,
            }) 

        }
        catch(error){
            console.log(error);
            errorResConfig(error,res);
        }
    },
    get_orders:(req,res,next)=>{
        try{
            const data=await CartItem.find()
            .populate({
                path:"Product",
                select:"name",
                populate:{
                    path:"Vendor",
                    match:{_id:req.user._id},
                }
            });

            res.status(200).json({
                user:data,
                error:null,
            })             
        }
        catch(error){
            console.log(error);
            errorResConfig(error,res);
        }
    },
    get_one_order:(req,res,next)=>{
        try{
            const data=await CartItem.find()
            .populate({
                path:"Product",
                select:"name",
                match:{_id:req.params.id},
                populate:{
                    path:"Vendor",
                    match:{_id:req.user._id},
                }
            });
            res.status(200).json({
                user:data,
                error:null,
            })    

        }
        catch(error){
            console.log(error);
            errorResConfig(error,res);
        }
    },

    // POST
    postOne_product:(req,res,next)=>{
        try{
            const user = req.user;
            const {name,quantity,price}=req.body
            const newProduct=new  Product({
                    owner:user._id,
                    name,
                    quantity,
                    price,
                    productType:req.file.minitype,
                    productImage:req.file.buffer
            })
            await newProduct.save();
            
    
            
    res.status(201).json({
        data:newProduct,
        error:false
    })
        }
        catch(error){
            console.log(error);
            errorResConfig(error,res);
        }
    },
    // PUT
    update_profile:(req,res,next)=>{
        try{
            const {name,password}=req.body;

        }
        catch(error){
            console.log(error);
            errorResConfig(error,res);
        }
    },
    update_orders:(req,res,next)=>{
        try{
            const {email,password}=req.body;

        }
        catch(error){
            console.log(error);
            errorResConfig(error,res);
        }
    },
    
    // DELETE
    delete_one_product:(req,res,next)=>{
        try{

        }
        catch{
            
        }
},
    // PASSWORD
    forget:()=>{
        
            crypto.randomBytes(32,(err,buffer)=>{
                if(err)
                {
                    console.log(err);
                }
                else{
                    const token=buffer.toString("hex");
                    // findOne will return object where else find return array
                    User.findOne({Email:req.body.Email})
                    .then((Info)=>{
                        if(!Info)
                        {
                           return res.status(404).json("User with this email does not exits")
                        }
                        
                        Info.ResetToken=token
                        // exp after 2 min
                        Info.ExpireToken=Date.now()+120000
                        // console.log((Info));
                        //     transporter.sendMail({
                        //         to:req.body.Email,
                        //         from:"jitulteron9@gmail.com",
                        //         subject:"Password Reset",
                        //         html:`<h4>Click <a href="http://localhost:3000/reset/${token}">Here</a></h4>`  
                        https://blogteron.herokuapp.com/
                        //     })
                        //     res.json({meg:"Check Your Email Please"})
                        // Info.save();
                        Info.save().then((result)=>{
                            transporter.sendMail({
                                to:req.body.Email,
                                from:"jitulteron9@gmail.com",
                                subject:"Password Reset",
                                html:`<h4>Click <a href="https://ben-ven.herokuapp.com/reset/${token}">Here</a></h4>`  
                            }).then(data=>res.json({meg:"Check Your Email Please"}))
                            
                        })
                    })
                }
            })

        
        
    },
    reset:()=>{
        try{
    const newPassword=req.body.Password;
    const setToken=req.body.token;
    User.findOne({ResetToken:setToken,ExpireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user)
        {
           return res.status(404).json({msg:"session expired try again"});
        }
        bcrypt.hash(newPassword,12)
        .then(hashed=>{
            user.Password=hashed;
            user.ResetToken=undefined;
            user.setToken=undefined;
            user.save()
            .then((info)=>{
                res.json({msg:"Password Updated !"})
            })
        })
    })

        }
        catch(error){
            console.log(error);
            errorResConfig(error,res);
        }
    }
}

module.exports={
    VendorContoller
}

