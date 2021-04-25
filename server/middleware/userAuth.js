const jwt = require('jsonwebtoken')
const { User } = require('../models')

const auth = async (req, res, next) => {
    try {
        let token = req.cookies.authorization
        
        if (!token) {
          return  res.json({ user:null , error:"No Authorization token! Authorize to proceed" })
        }
        
        let data = jwt.verify(token, process.env.TOKEN_SECRET)

        if (!data) {
          return  res.json({ user:null , error:"Invalid token! Authorize to proceed" })
        }

        console.log(data);

        let user = await User.findById(data._id)

        req.user = user

        next()
    } catch (error) {
        
        return  res.json({ user:null , error:"Internal Server Error!" })
    }
}


module.exports = auth