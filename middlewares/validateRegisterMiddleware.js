const {body}= require('express-validator');
const path = require('path');
const db = require('../database/models');



const validateRegisterMiddleware=[
    body('nombre').notEmpty().withMessage('El Nombre es requerido').bail()
      .isLength({min :2}).withMessage("El Nombre debe contener al menos 2 caracteres"),
    body('apellido').notEmpty().withMessage('El Apellido es requerido').bail()
    .isLength({min :2}).withMessage("El Apellido debe contener al menos 2 caracteres"),
    body('dni').notEmpty().withMessage('El DNI es requerido'),
    body('fechaNac').notEmpty().withMessage('La Fecha de nacimiento es requerida'),
    body('password1').notEmpty().withMessage('La Contraseña es requerida')
        .isLength({min:8}).withMessage("La contraseña debe contener al menos 8 caractéres")
        .matches('[A-Z]').withMessage("Debe contener al menos una Mayúscula")
        .matches('([a-z])').withMessage("Debe contener al menos una Minúscula")
        .matches('([0-9])').withMessage("Debe contener al menos una Número")
        .matches('(?=.*[^a-zA-Z0-9])').withMessage("Debe contener al menos un Caractér Especial"),
    body('password2').notEmpty().withMessage('Tenes que reingresar la contraseña').bail()
        .custom(async (password2, {req}) => {
          const password1 = req.body.password1
          if(password1 !== password2){
          throw new Error('Las Contraseñas no coinciden')
        }}),
    body('tel').notEmpty().withMessage('El número de contacto es requerido'),
    body('email1').notEmpty().withMessage('El Email es requerido').bail()
        .isEmail().withMessage('El email debe tener un formato válido').bail(),
       

        
        //.custom(value => {
        //    console.log(value,"hola")
        //    db.User.findAll({ where: { email: value } })
        //            .then(user => {
        //                if (!user) {
        //                  console.log("Nada")
        //                }
        //    })
        //    .catch(e=>{
        //      console.log(e)
        //      Promise.reject('Este correo ya esta en uso.');
        //    });
        //  }),
    body('email2').notEmpty().withMessage('La verificación de Email es requerida').bail().isEmail().withMessage('El email debe tener un formato válido').bail()
      .custom(async (email2, {req}) => {
        const email1 = req.body.email1
        if((email2.length > 0) && email1 !== email2){
            throw new Error('Los Emails no coinciden')
        }}),
    body('profilePhoto')
      .custom((value, { req }) => {
	 	    let file = req.file;
	 	    let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
	 	    if (!file) {
	 	    	throw new Error('Tienes que subir una imagen');
	 	    } else {
	 	    	let fileExtension = path.extname(file.originalname);
	 	    	if (!acceptedExtensions.includes(fileExtension)) {
	 	    		throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
	 	    	}
	 	    return true;
	    }})
]

    module.exports=validateRegisterMiddleware;