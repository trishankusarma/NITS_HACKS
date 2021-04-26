const router=require("express").Router();
const {vendor}=require("../controllers");
const {userAuth}=require("../middleware/")
const { upload } = require('../utils');

// GET
router.get('/all',userAuth("Vendor"), vendor.VendorContoller.getAll_products);
router.get('/one',userAuth("Vendor"),vendor.VendorContoller.getOne_product);
router.get('/all_orders',userAuth("Vendor"),vendor.VendorContoller.get_orders);
router.get('/profile',userAuth("Vendor"),vendor.VendorContoller.get_profile);
router.get('/one_order',userAuth("Vendor"),vendor.VendorContoller.get_one_order);
router.get('/logout',userAuth("Vendor"),vendor.VendorContoller.logout);

// POST
router.post('/login', vendor.VendorContoller.login);
router.post('/register',vendor.VendorContoller.registration);
router.post('/one',userAuth("Vendor"),upload.single('upload_image'),vendor.VendorContoller.postOne_product);
router.post('/reset',userAuth("Vendor"),vendor.VendorContoller.reset);

//PUT
router.put('/one_order',userAuth("Vendor"),vendor.VendorContoller.update_orders);
router.put('/profile',userAuth("Vendor"),upload.single('upload_profile'),vendor.VendorContoller.update_profile);

//DELETE
router.delete('/one',userAuth("Vendor"),vendor.VendorContoller.delete_one_product);

router.get('/test',(req,res)=>{
    res.send("jitul teorn")
});
module.exports = router;