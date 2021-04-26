const router=require("express").Router();
const {vendor}=require("../controllers");

// GET
router.get('/', vendor.VendorContoller.getAll_products);
router.get('/', vendor.VendorContoller.getOne_product);
router.get('/', vendor.VendorContoller.get_orders);
router.get('/', vendor.VendorContoller.get_profile);
router.get('/', vendor.VendorContoller.get_one_order);

// POST
router.post('/', vendor.VendorContoller.login);
router.post('/', vendor.VendorContoller.registration);
router.post('/', vendor.VendorContoller.postOne_product);
router.post('/', vendor.VendorContoller.reset);

//PUT
router.put('/', vendor.VendorContoller.update_orders);
router.put('/', vendor.VendorContoller.update_profile);

//DELETE
router.delete('/', vendor.VendorContoller.delete_one_product);


module.exports = router;