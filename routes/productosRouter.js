const express = require('express');
const router = express.Router();

//controllers
const productosController = require('../controllers/productosController');
//middleWares
const uploadFile=require('../middlewares/productsMulter')



router.get('/product-detail/:id', productosController.detail); 
router.get('/cart',productosController.cart);
router.get('/checkout-adress',productosController.checkoutAdress);
router.get('/checkout-confirm',productosController.checkoutConfirm);
router.get('/checkout-data',productosController.checkoutData);
router.get('/checkout-payment',productosController.checkoutPayment);
router.get('/checkout-shipping',productosController.checkoutShipping);
router.get('/product-create',productosController.productCreate);
router.post('/product-create',uploadFile.any(),productosController.createConfirm); 
router.get('/product-edit/:id',productosController.productEdit);
router.put('/product-edit/:id', uploadFile.any(), productosController.productUpdate);
router.delete('/product-detail/:id', productosController.delete); 


module.exports = router;