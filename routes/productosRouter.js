const fs = require("fs");
const path = require("path");
const multer = require('multer');
const express = require('express');
const router = express.Router();
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
var products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


const productosController = require('../controllers/productosController');
const multerDiskStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
    const folder = path.join(__dirname,'../public/images')
    cb(null,folder)
    },
    filename:(req,file,cb)=>{
        const filename = Date.now() + path.extname(file.originalname)
        cb(null,filename)
        },
})
const fileUpload = multer({storage:multerDiskStorage})



router.get('/product-detail/:id', productosController.detail); 
router.get('/cart',productosController.cart);
router.get('/checkout-adress',productosController.checkoutAdress);
router.get('/checkout-confirm',productosController.checkoutConfirm);
router.get('/checkout-data',productosController.checkoutData);
router.get('/checkout-payment',productosController.checkoutPayment);
router.get('/checkout-shipping',productosController.checkoutShipping);
router.get('/product-create',productosController.productCreate);
router.post('/product-create',fileUpload.any(),productosController.createConfirm); 
router.get('/product-edit/:id',productosController.productEdit);
router.put('/product-edit/:id',productosController.productUpdate);
router.delete('/product-detail/:id', productosController.delete); 


module.exports = router;