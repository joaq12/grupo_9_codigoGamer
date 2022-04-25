
const express = require('express');

const router = express.Router();


const mainControllers = require('../controllers/mainControllers');
const form = require('../controllers/formularios');
const productosController = require('../controllers/productos');

router.get('/', mainControllers.home);
router.get('/product-detail',productosController.description)

module.exports = router;