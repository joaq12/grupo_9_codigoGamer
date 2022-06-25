const express = require('express');
const router = express.Router();

//controllers
const productosController = require('../controllers/productosController');
//middleWares
const uploadFile=require('../middlewares/productsMulter')
const authMiddleware = require("../middlewares/authMiddleware")

// detalles de producto
router.get('/product-detail/:id', productosController.detail); 
//carrito de compras
router.get('/cart',authMiddleware,productosController.cart);
// proceso de checkout
router.get('/checkout-adress', authMiddleware, productosController.checkoutAdress);
router.get('/checkout-confirm', authMiddleware, productosController.checkoutConfirm);
router.get('/checkout-data', authMiddleware, productosController.checkoutData);
router.get('/checkout-payment', authMiddleware, productosController.checkoutPayment);
router.get('/checkout-shipping', authMiddleware, productosController.checkoutShipping);
//creacion de productos 
router.get('/product-create', authMiddleware, productosController.productCreate);
router.post('/product-create', authMiddleware, uploadFile.any(),productosController.createConfirm); 
// edicion y borrado de productos
router.get('/product-edit/:id', authMiddleware, productosController.productEdit);
router.put('/product-edit/:id', authMiddleware, uploadFile.any(), productosController.productUpdate);
router.delete('/product-detail/:id',authMiddleware, productosController.delete); 


module.exports = router;