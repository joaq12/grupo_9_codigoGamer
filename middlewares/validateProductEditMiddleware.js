const {body}= require('express-validator');
const path = require('path');
const db = require('../database/models');



const validateProductEditMiddleware=[
    body('name').notEmpty().withMessage('El Nombre es requerido').bail()
      .isLength({min :2}).withMessage("El Nombre debe contener al menos 5 caracteres"),
    body('description').notEmpty().withMessage('La descripción es requerida').bail()
    .isLength({min :20}).withMessage("Debe contener al menos 20 caracteres"),
    



    //body('photo1')
    //  .custom((value, { req }) => {
    //    let file = req.file;
    //    let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
	// 	    if (!file) {
	// 	    	throw new Error('Tienes que subir una imagen');
	// 	    } else {
	// 	    	let fileExtension = path.extname(file.originalname);
	// 	    	if (!acceptedExtensions.includes(fileExtension)) {
	// 	    		throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
	// 	    	}
	// 	    return true;
	//    }}),
]

    module.exports=validateProductEditMiddleware;