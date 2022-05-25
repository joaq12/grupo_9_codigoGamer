const express= require('express');
const router= express.Router();
//controllers
const usersController= require('../controllers/usersController');
//middleWares
const validateRegister=require('../middlewares/validateRegisterMiddleware')
const uploadFile=require('../middlewares/usersMulter');




router.get('/user-login',usersController.login);
router.get('/user-register',usersController.register);
router.post('/user-register',uploadFile.single('profilePhoto'),validateRegister,usersController.registerProcess);
router.get('/user-edit/:id',usersController.userEdit);
router.put('/user-edit/:id',uploadFile.single('profilePhoto'),validateRegister,usersController.userUpdate);
router.delete('user-edit/:id',usersController.userDelete);
//router.get('/user-profile/:id',usersController.userDetail)
module.exports= router;