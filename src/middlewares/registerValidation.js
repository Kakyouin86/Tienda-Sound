const {check} = require("express-validator");
const path = require('path');

const validations = [

    check("nombreCompleto")
		.notEmpty(),
		// .withMessage("Tenés que escribir un nombre"),

    check("email")
		.notEmpty()
		// .withMessage("Tenés que escribir un email")
		.bail()
		.isEmail(),
		// .withMessage("Tenés que escribir un formato de email válido"),

    check("password")
		.notEmpty()
		// .withMessage("Tenés que escribir una contraseña")
		.bail()
		.isLength({ min: 8 })
		// .withMessage("La contraseña debe tener al menos 8 caracteres")
		.matches(/^(?=.[!@#$%^&])(?=.[A-Z]).$/),
		// .withMessage("La contraseña debe contener al menos un carácter especial y una letra mayúscula"),

    check("checkbox")
		.custom((value, { req }) => {
		if (value !== "on") {
			throw new Error("Tenés que aceptar nuestros términos y condiciones");
		}
		return true;
		}),

    check("avatar")
		.custom((value, { req }) => {
        let file = req.file;
		let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
		
		if (!file) {
			throw new Error('Tenés que subir una imagen con formato .jpg, .jpeg, .png, .gif');
		}
		else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	})
]

module.exports = validations;
