
const express = require('express');

const router = express.Router();


const mainControllers = require('../controllers/mainControllers');
const form = require('../controllers/formularios');
const product = require('../controllers/productos');

router.get('/', mainControllers.home);



module.exports = router;