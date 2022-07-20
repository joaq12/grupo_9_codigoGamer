
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.inicio);
router.get('/home', mainController.home);
router.get('/store/:id',mainController.storeByCategory);
router.get('/contact',mainController.contact);



module.exports = router;
