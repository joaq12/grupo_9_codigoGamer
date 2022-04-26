
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/product-detail',productosController.detail);
router.get('/cart',productosController.cart);
module.exports = router;