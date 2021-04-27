const router = require('express').Router();
const {userContoller} = require('../controllers/user');
const { userAuth } = require('../middleware/');
const {upload}=require("../utils");



router.get( '/profile' , userAuth("User") ,userContoller.get_profile );
router.get("/all", userAuth("User"),userContoller.getAll_products);
router.get("/one/:id", userAuth("User"),userContoller.getOne_product);

router.get('/logout',userAuth("User"),userContoller.logout);

router.post('/register',userContoller.registration);
router.post('/login',userContoller.login);

router.post("/addTocart", userAuth("User"),userContoller.addTocart);

router.post("/bought", userAuth("User"),userContoller.Bought);
router.post("/savelater", userAuth("User"),userContoller.saveLater);
router.post("/reset", userAuth("User"),userContoller.reset);

// router.put('/uploadProfile', upload.single('upload_profile') , userAuth("User") , userContoller);

router.put('/uploadProfile', upload.single('upload_profile') , userAuth("User") , userContoller.update_profile );

router.get( '/test' ,(req,res)=>{
    res.json({
        message:"done"
    })
});

module.exports = router;