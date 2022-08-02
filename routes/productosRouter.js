const express = require('express');
const router = express.Router();

//controllers
const productosController = require('../controllers/productosController');
//middleWares
const uploadFile=require('../middlewares/productsMulter')
const authMiddleware = require("../middlewares/authMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")
const validatepCreate=require('../middlewares/validateProductCreateMiddleware')
const validateEdit=require('../middlewares/validateProductEditMiddleware')

//categorias
router.get('/category-create',adminMiddleware, productosController.categoryCreate); 
router.post('/category-create', uploadFile.any(),productosController.categoryConfirm); 
router.get('/category-edit/:id', adminMiddleware,  productosController.categoryEdit);
router.put('/category-edit/:id', uploadFile.any(),productosController.categoryUpdate);  
router.delete('/category-edit/:id', adminMiddleware, productosController.categoryDelete); 

//listado de productos
router.get('/productsList',productosController.list);

//buscador
router.get('/search', productosController.search); 


// detalles de producto
router.get('/product-detail/:id', productosController.detail); 

//carrito de compras
router.get('/cart',productosController.cart);
// proceso de checkout
router.get('/checkout-adress',  productosController.checkoutAdress);
router.get('/checkout-confirm',  productosController.checkoutConfirm);
router.get('/checkout-data', productosController.checkoutData);
router.get('/checkout-payment',  productosController.checkoutPayment);
router.get('/checkout-shipping',  productosController.checkoutShipping);

//creacion de productos 
router.get('/product-create', adminMiddleware, productosController.productCreate);
router.post('/product-create', uploadFile.any(),validatepCreate,productosController.createConfirm); 

// edicion y borrado de productos
router.get('/product-edit/:id', adminMiddleware, productosController.productEdit);
router.put('/product-edit/:id',uploadFile.any(),validateEdit, productosController.productUpdate);
router.delete('/product-detail/:id', productosController.delete); 


module.exports = router;