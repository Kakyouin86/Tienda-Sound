const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");
const User = require("../models/User");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Traemos los datos de json y lo convertimos a objeto lit.
const productsFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const productosNuevos = productos.filter(item => item.estadoProducto === "Nuevo");
const productosUsados = productos.filter(item => item.estadoProducto === "Usado");
const db = require('../../database/models');

// credenciales Cloudinary 
cloudinary.config({ 
	cloud_name: 'dlf8flk1o', 
	api_key: '829857512934227', 
	api_secret: 'iTQRHKw1LiAeUUeO8jrfx3d_MVg' 
});

let mainController = {
	index: function (req, res)
	{
		const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('./pages/home', { producto: productos });
	},

	carrito: function (req, res)
	{
		res.render('./pages/carrito');
	},
}

module.exports = mainController;