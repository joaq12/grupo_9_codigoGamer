const path=require('path');
const {body}=require('express-validator');

const validateRegister=[
    body('nombre').notEmpty().withMessage('Nombre es requerido'),
    body('apellido').notEmpty().withMessage('Apellido es requerido'),
    body('dni').isNumeric().notEmpty().withMessage('dni es requerido'),
    body('sexo').notEmpty().withMessage('Genero es requerido'),
    body('fechaNac').notEmpty().withMessage('Fecha de nacimiento es requerida'),
    body('password1').notEmpty().withMessage('la Contraseña es requerida'),
    body('password2').notEmpty().withMessage('Las contraseñas deben coincidir'),
    body('tel').notEmpty().withMessage('El numero de contacto es requerido'),
    body('email1').isEmail().withMessage('el email debe tener un formato valido').bail().notEmpty().withMessage('El email debe tener un formato valido'),
    body('email2').isEmail().withMessage('el email debe tener un formato valido').bail().notEmpty().withMessage('El email debe coincidir'),
    body('profilePhoto').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]

    module.exports=validateRegister;