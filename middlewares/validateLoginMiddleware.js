
const {body} = require('express-validator');

const validateLoginMiddleware=[
    
    body('email').notEmpty().withMessage('Ingresá un Email').bail().isEmail().withMessage('Formato de Email inválido'),
    body('password').notEmpty().withMessage('Ingresá una Contraseña'),
]

    module.exports = validateLoginMiddleware;