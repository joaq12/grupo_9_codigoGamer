const express= require('express');
const router= express.Router();
const loginController= require('../controllers/loginController')

router.get('/login',loginController.login);
router.get('/registe',loginController.register);
module.exports= router;