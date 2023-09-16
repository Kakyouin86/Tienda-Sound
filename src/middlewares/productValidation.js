const {check} = require("express-validator");
const path = require('path');

const productValidations = [

    check("nombreProducto").notEmpty().withMessage('Tenes que poner un nombre'),

	check("descripcionProductoCorta").notEmpty().withMessage('Tenes que poner un nombre'),

    check("precioProducto").notEmpty().bail().isNumeric().withMessage('Tenes que poner un nombre'),
		
    check("precioEnvio").notEmpty().bail().isNumeric().withMessage('Tenes que poner un nombre'),


	check("estadoProducto").isIn(['Nuevo', 'Usado']).notEmpty().withMessage('Tenes que poner un nombre'),

	check("descripcionProductoLarga").notEmpty().withMessage('Tenes que poner un nombre'),

	check("categoriaProducto").isIn(["Guitarras y Bajos", "Batería y Percusión", "Teclados y Sintetizadores", "Estudio de Grabación, Dj's", "Vientos", "Cuerdas"]).notEmpty().withMessage('Tenes que poner un nombre'),

    check("fotoDestacada")
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

module.exports = productValidations;
