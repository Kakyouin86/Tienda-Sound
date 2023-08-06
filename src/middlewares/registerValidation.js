const {check} = require("express-validator");
const validations = [

    check("nombreCompleto").notEmpty().withMessage("Tenés que escribir un nombre"),
    check("email").notEmpty().withMessage("Tenés que escribir un Email").bail().isEmail().withMessage("Tenés que escribir un formato de correo electrónico válido"),
    check("password").notEmpty().withMessage("Tenés que escribir una contraseña"),
    // check("checkbox").isIn().withMessage("Tenés que aceptar nuestros términos y condiciones")
   
]

module.exports = validations;