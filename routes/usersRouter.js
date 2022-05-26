const express= require('express');
const router= express.Router();


//controllers
const usersController= require('../controllers/usersController');
//middleWares
const validateRegister=require('../middlewares/validateRegisterMiddleware')
const uploadFile=require('../middlewares/usersMulter');



//todos los usuarios
router.get('/users',usersController.allUsers);
//perfil de usuario
router.get('/user-profile/:id',usersController.userDetails);
//login usuario
router.get('/user-login',usersController.login);
//registro de usuario
router.get('/user-register',usersController.register);
router.post('/user-register',uploadFile.single('profilePhoto'),validateRegister,usersController.registerProcess);
//edicion de usuarios
router.get('/user-edit/:id',usersController.userEdit);
router.delete('user-edit/:id',usersController.userDelete);
router.put('/user-edit/:id',uploadFile.single('profilePhoto'),validateRegister,usersController.userUpdate);


module.exports= router;