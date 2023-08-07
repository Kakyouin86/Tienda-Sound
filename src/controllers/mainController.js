const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");
const User = require("../models/User");

// Traemos los datos de json y lo convertimos a objeto lit.
const productsFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const productosNuevos = productos.filter(item => item.estadoProducto === "Nuevo");
const productosUsados = productos.filter(item => item.estadoProducto === "Usado");


let mainController = {
	index: function (req, res)
	{
		const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('./pages/home', { producto: productos });
	},

	// metodos de usuarios 
	login: function (req, res)
	{
		res.render('./pages/login');
	},
	loginProcess: function (req, res)
	{
		let userToLogin = User.findByField('email', req.body.email)
		if (userToLogin) {
			let isPasswordOk = bcrypt.compareSync(req.body.password, userToLogin.password)
			if (isPasswordOk) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;
				if (req.body.checkbox = true) {
					res.cookie('userEmailCookie', req.body.email, {maxAge: 6000})
				}
				res.redirect('/profile')
			} else {
				res.render('./pages/login', {
				errors: {
					password: {
						msg: 'La contraseña es incorrecta.'
					}
 				}
			})}
		} else {
		res.render('./pages/login', {
			errors: {
				email: {
					msg: 'Este mail no se encuentra en nuestra base de datos.'
				}
			},
			oldData: req.body
		});
		}
	},
	logout: function (req, res)
	{
		res.clearCookie('userEmailCookie');
		req.session.destroy();
		return res.redirect ('/')
	},
	profile: function (req, res)
	{	
		res.render('./pages/profile', {
			user: req.session.userLogged
		});
	},
	register: function (req, res)
	{
		res.render('./pages/register');
	},
	guardarUser: function (req, res)
	{
		const resultValidation = validationResult(req)
		if (resultValidation.errors.length > 0){
			return res.render('./pages/register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}
		let userInDB = User.findByField('email', req.body.email)
		if (userInDB) {
			return res.render('./pages/register', {
				errors: {
					email: {
						msg: 'El email que desea ingresar ya está registrado.'
					}
				},
				oldData: req.body
			});
		}
		let userToCreate = {
			...req.body,
			password: bcrypt.hashSync(req.body.password, 10),
			avatar: req.file.filename
		};
		let userCreated = User.create(userToCreate);
		return res.redirect("/login")
	},

	// metodos de productos
	// renderiza todos los productos en grid
	productos: function (req, res)
	{
		const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('./pages/productos', { producto: productos });
	},
	productosNuevos: function (req, res)
	{
		const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('./pages/productos', { producto: productosNuevos });
	},
	productosUsados: function (req, res)
	{
		const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('./pages/productos', { producto: productosUsados });
	},
	// detalle de un solo producto
	producto: function (req, res)
	{
		let idProductoBuscado = req.params.id;
		let productoBuscado;
		for (let i = 0; i < productos.length; i++)
		{
			if (idProductoBuscado == productos[i].id)
			{
				productoBuscado = productos[i];
			}
		}
		res.render('./pages/producto', { producto: productoBuscado, productos: productos });
	},
	// renderiza el form
	renderCrearProducto: function (req, res)
	{
		res.render('./pages/crearProducto');
	},
	// guardar los datos en json
	guardarProducto: function (req, res)
	{
	
		let idNuevoProducto = productos[productos.length - 1].id + 1;
		let objNuevoProducto = {
			id: idNuevoProducto,
			nombreProducto: req.body.nombreProducto,
			descripcionProductoCorta: req.body.descripcionProductoCorta,
			precioProducto: parseInt(req.body.precioProducto),
			estadoProducto: req.body.estadoProducto,
			descripcionProductoLarga: req.body.descripcionProductoLarga,
			categoriaProducto: req.body.categoriaProducto,
			/* if ternario para preguntar si viene imagen, que la escriba, sino que se quede con la foto por default */
			fotoDestacada: req.file ? `${req.file.filename}` : "default-photo.jpg",
			envio: 0,
			oferta: "no",
		};
		productos.push(objNuevoProducto);
		fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '));
		res.redirect('/productos');
	},
	// renderiza el form de editar producto
	renderEditarProducto: (req, res) =>
	{
		let idProductoBuscado = req.params.id;
		let productoBuscado;
		for (let i = 0; i < productos.length; i++)
		{
			if (idProductoBuscado == productos[i].id)
			{
				productoBuscado = productos[i];
			}
		}
		res.render('./pages/editarProducto', { producto: productoBuscado });
	},
	// actualiza el json
	editarProducto: (req, res) =>
	{
		const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); // hasta aquí
		const producto = productos.find(producto => producto.id == req.params.id);
		if (producto)
		{
			producto.nombreProducto = req.body.nombreProducto;
			producto.descripcionProductoCorta = req.body.descripcionProductoCorta;
			producto.precioProducto = parseInt(req.body.precioProducto);
			producto.estadoProducto = req.body.estadoProducto;
			producto.descripcionProductoLarga = req.body.descripcionProductoLarga;
			producto.categoriaProducto = req.body.categoriaProducto;
			producto.fotoDestacada = req.file ? `${req.file.filename}` : producto.fotoDestacada;

			fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '));
			res.redirect('/productos');
		} else
		{
			res.send(`
				<div style="text-align: center; padding-top:30px">
				<h1>El producto no se puede editar</h1>
				<img style="width:40%;" src="/img/productos/default-photo.jpg">
				</div>
				`);
		};
	},
	borrarProducto: (req, res) =>
	{
		let idProductoBuscado = req.params.id;
		let productosActualizados = productos.filter(product => product.id != idProductoBuscado);
		/* busco la foto a borrar para eliminarle la imagen */
		const productToDelete = productos.find((product) => product.id == req.params.id);
		const publicPath = path.join(__dirname, "../../public/img/productos/");
		console.log(publicPath);
		/* utilizo fs.existsSync para saber si existe una imagen física en nuestra carpeta estatica, si la tiene que la borre con fsUnlink, sino que no haga nada */
		if (fs.existsSync(path.join(publicPath, productToDelete.fotoDestacada)))
		{
			fs.unlinkSync(
				path.join(publicPath, productToDelete.fotoDestacada)
			);
		}
		fs.writeFileSync(productsFilePath, JSON.stringify(productosActualizados, null, ' '));
		productos;
		res.redirect('/productos');
	},
	carrito: function (req, res)
	{
		res.render('./pages/carrito');
	},
}

module.exports = mainController;