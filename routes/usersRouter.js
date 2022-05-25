const express= require('express');
const router= express.Router();
const usersController= require('../controllers/usersController')
const fs=require('fs');
const path=require('path');
const multer=require('multer');
const {body}=require('express-validator');

//configuracion multer
const multerDiskStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
    const folder = path.join(__dirname,'../public/images/users')
    cb(null,folder)
    },
    filename:(req,file,cb)=>{
        const filename = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null,filename)
        },
})
const fileUpload = multer({storage:multerDiskStorage})
//
//configuracion de validacion registro//
const validateRegister=[
body('nombre').notEmpty().withMessage('Nombre es requerido'),
body('apellido').notEmpty().withMessage('Apellido es requerido'),
body('dni').isNumeric().notEmpty().withMessage('dni es requerido'),
body('sexo').notEmpty().withMessage('Genero es requerido'),
body('fechaNac').notEmpty().withMessage('Fecha de nacimiento es requerida'),
body('password').notEmpty().withMessage('la Contraseña es requerida'),
body('password').notEmpty().withMessage('Las contraseñas deben coincidir'),
body('tel').notEmpty().withMessage('El numero de contacto es requerido'),
body('email').isEmail().notEmpty().withMessage('El email debe tener un formato valido'),
body('email').isEmail().notEmpty().withMessage('El email debe coincidir')
]
//
router.get('/user-login',usersController.login);
router.get('/user-register',usersController.register);
router.post('/user-register',fileUpload.single('profilePhoto'),validateRegister,usersController.usersCreate);
router.get('/user-edit/:id',usersController.userEdit)
router.put('/user-edit/:id',fileUpload.single('profilePhoto'),validateRegister,usersController.userUpdate)
router.delete('user-edit/:id',usersController.userDelete)
module.exports= router;