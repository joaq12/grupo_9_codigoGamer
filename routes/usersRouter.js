const express= require('express');
const router= express.Router();


//controllers
const usersController= require('../controllers/usersController');
//middleWares
const validateRegister=require('../middlewares/validateRegisterMiddleware')
const validateLogin = require("../middlewares/validateLoginMiddleware")
const uploadFile=require('../middlewares/usersMulter');
const ghestMiddleware = require("../middlewares/ghestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")
const validateUserEdit = require("../middlewares/validateUserEditMiddleware")

//todos los usuarios
router.get('/users',authMiddleware, usersController.allUsers);
//perfil de usuario
router.get('/user-profile/:id',authMiddleware, usersController.userDetails);
//login usuario
router.get('/user-login', ghestMiddleware, usersController.login);
router.post('/user-login', validateLogin, usersController.loginProcess);
router.post("/user-logout",authMiddleware, usersController.logout)
//registro de usuario
router.get('/user-register', ghestMiddleware, usersController.register);
router.post('/user-register', ghestMiddleware, uploadFile.single('profilePhoto'),validateRegister,usersController.registerProcess);
//edicion de usuarios
router.get('/user-edit/:id',usersController.userEdit);
router.delete('/user-edit/:id',usersController.userDelete);
router.put('/user-edit/:id',uploadFile.single('profilePhoto'),validateUserEdit,usersController.userUpdate);

router.get("/ghestUser", usersController.ghest)
router.get("/authUser", usersController.auth)

module.exports= router;