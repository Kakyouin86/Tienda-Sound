const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");
const User = require("../models/User");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Traemos los datos de json y lo convertimos a objeto lit.
let db = require ('../../database/models');
const { DataTypes } = require('sequelize');

// credenciales Cloudinary 
cloudinary.config({ 
	cloud_name: 'dlf8flk1o', 
	api_key: '829857512934227', 
	api_secret: 'iTQRHKw1LiAeUUeO8jrfx3d_MVg' 
});

let mainController = {
	index: function (req, res)
	{
		Promise.all([
			db.Producto.findAll(),
			db.Categoria.findAll(),
		  ])
			.then(function([productos, categorias]) {
			  res.render('./pages/home', { producto: productos, categorias: categorias });
			})
			.catch(function(error) {
			  console.error(error);
			  res.status(500).json({ message: 'Error interno del servidor' });
			});
	},

	carrito: function (req, res)
	{
		res.render('./pages/carrito');
	},
}

module.exports = mainController;