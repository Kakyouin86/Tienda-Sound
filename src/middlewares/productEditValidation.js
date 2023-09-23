const {check} = require("express-validator");
const path = require('path');

const productEditValidations = [

    check("nombreProducto").notEmpty().withMessage('Tenes que poner un nombre.'),

	check("descripcionProductoCorta").notEmpty().withMessage('Tenes que poner una descripción.'),

    check("precioProducto")
	.notEmpty().withMessage('El precio de envio no puede estar vacío')
	.bail()
	.isNumeric().withMessage('El precio de envio debe ser un número'),
		
	check("precioEnvio")
	.notEmpty().withMessage('El precio de envio no puede estar vacío')
	.bail()
	.isNumeric().withMessage('El precio de envio debe ser un número'),

	// check("estadoProducto").isIn(['Nuevo', 'Usado']).notEmpty().withMessage('Tenes que poner el estado del producto'),

	check("descripcionProductoLarga").notEmpty().withMessage('Tenes que poner una descripción'),

	// check("categoriaProducto").isIn(["Guitarras y Bajos", "Batería y Percusión", "Teclados y Sintetizadores", "Estudio de Grabación, Dj's", "Vientos", "Cuerdas"]).notEmpty().withMessage('Tenes que poner un nombre'),
	
	check("fotoDestacada")
	.custom((value, { req }) => {
	  let file = req.file;
	  let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  
	  // Check if a file was uploaded
	  if (file) {
		let fileExtension = path.extname(file.originalname);
		if (!acceptedExtensions.includes(fileExtension)) {
		  throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
		}
	  } else {
		// No new file uploaded, skip the validation
		return true;
	  }
	})
]

module.exports = productEditValidations;
