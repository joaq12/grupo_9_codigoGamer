
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/product-detail',productosController.detail);
router.get('/cart',productosController.cart);
router.get('/checkout-adress',productosController.checkoutAdress);
router.get('/checkout-confirm',productosController.checkoutConfirm);
router.get('/checkout-data',productosController.checkoutData);
router.get('/checkout-payment',productosController.checkoutPayment);
router.get('/checkout-shipping',productosController.checkoutShipping);
router.get('/product-upload-edit',productosController.productUpload);


module.exports = router;