const errorRes=(error,res)=>{
    return res.status(500).json({
        data:null,
        error:"Internal server error"
    })    
}
module.exports=errorRes;