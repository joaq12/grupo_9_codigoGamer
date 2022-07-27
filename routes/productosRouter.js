const express = require('express');
const router = express.Router();

//controllers
const productosController = require('../controllers/productosController');
//api controller
const apiProductController=require('../api/productscontroller');
//middleWares
const uploadFile=require('../middlewares/productsMulter')
//const authMiddleware = require("../middlewares/authMiddleware")


//categorias
router.get('/category-create', productosController.categoryCreate); 
router.post('/category-create', uploadFile.any(),productosController.categoryConfirm); 
router.get('/category-edit/:id', productosController.categoryEdit);
router.put('/category-edit/:id', uploadFile.any(),productosController.categoryUpdate);  
router.delete('/category-edit/:id', productosController.categoryDelete); 


//listado de productos
router.get('/productsList',productosController.list);


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
router.get('/product-create', productosController.productCreate);
router.post('/product-create', uploadFile.any(),productosController.createConfirm); 

// edicion y borrado de productos
router.get('/product-edit/:id',  productosController.productEdit);
router.put('/product-edit/:id',uploadFile.any(), productosController.productUpdate);
router.delete('/product-detail/:id', productosController.delete); 

//rutas apis
router.get('/api/products',apiProductController.all);
router.get('/api/products/:id',apiProductController.showProduct);
router.get('/api/categories',apiProductController.countByCategory);


module.exports = router;