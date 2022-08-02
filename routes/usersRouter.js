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
const adminMiddleware = require("../middlewares/adminMiddleware")
const uDetailMiddleware = require("../middlewares/uDetailMiddleware")

const validateUserEdit = require("../middlewares/validateUserEditMiddleware")

// todos los usuarios
/router.get('/users' ,adminMiddleware, usersController.allUsers);
// perfil de usuario
 router.get('/user-profile/:id', authMiddleware,uDetailMiddleware , usersController.userDetails);
// login usuario
router.get('/user-login',ghestMiddleware, usersController.login);
router.post('/user-login', validateLogin , usersController.loginProcess);
router.post("/user-logout",authMiddleware, usersController.logout)
//registro de usuario
router.get('/user-register', usersController.register);
router.post('/user-register', uploadFile.single('profilePhoto'),validateRegister,usersController.registerProcess);

////edicion de usuarios
router.get('/user-edit/:id',authMiddleware , usersController.userEdit);
router.put('/user-edit/:id',uploadFile.single('profilePhoto'),usersController.userUpdate)
router.delete('/user-edit/:id',authMiddleware , usersController.userDelete);
router.get("/ghestUser", usersController.ghest)
router.get("/authUser", usersController.auth)

module.exports= router;