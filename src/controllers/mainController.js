const fs = require('fs');
const path = require('path');

// Traemos los datos de json y lo convertimos a objeto lit.
const productsFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let mainController = {
	// metodos de /
	index: function (req, res) {
		const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('./pages/home');
	},
	login: function (req, res) {
		res.render('./pages/login');
	},
	register: function (req, res) {
		res.render('./pages/register');
	},

	// metodos de productos

	// renderiza todos los productos en grid
	productos: function (req, res) {
		const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('./pages/productos', { producto: productos });
	},

	// detalle de un solo producto
	producto: function (req, res) {
		let idProductoBuscado = req.params.id;
		let productoBuscado;
		for (let i = 0; i < productos.length; i++) {
			if (idProductoBuscado == productos[i].id) {
				productoBuscado = productos[i];
			}
		}
		res.render('./pages/producto', { producto: productoBuscado });
	},

	// renderiza el form
	renderCrearProducto: function (req, res) {
		res.render('./pages/crearProducto');
	},

	// guardar los datos en json
	guardarProducto: function (req, res) {
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
			fotoDestacada: req.file ? `${req.file.filename}` : "default-photo.jpg"
		};

		productos.push(objNuevoProducto);
		fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '));
		res.redirect('/productos');
	},

	// renderiza el form de editar producto
	renderEditarProducto: (req, res) => {
		let idProductoBuscado = req.params.id;
		let productoBuscado;
		for (let i = 0; i < productos.length; i++) {

			if (idProductoBuscado == productos[i].id) {
				productoBuscado = productos[i];
			}
		}
		res.render('./pages/editarProducto', { producto: productoBuscado });
	},
	// actualiza el json
	editarProducto: (req, res) => {
		let idProductoBuscado = req.params.id;
		for (let i = 0; i < productos.length; i++) {
			if (idProductoBuscado == productos[i].id) {
				productos[i].nombreProducto = req.body.nombreProducto;
				productos[i].descripcionProductoCorta = req.body.descripcionProductoCorta;
				productos[i].precioProducto = parseInt(req.body.precioProducto);
				productos[i].estadoProducto = req.body.estadoProducto;
				productos[i].descripcionProductoLarga = req.body.descripcionProductoLarga;
				productos[i].categoriaProducto = req.body.categoriaProducto;

				productos[i].fotoDestacada = req.file ? `/img/productos/${req.file.filename}` : productos[i].fotoDestacada;

				fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '));
				res.redirect('/productos');
			} else {
				res.send(`
				<div style="text-align: center; padding-top:30px">
				<h1>El producto no se puede editar</h1>
				<img style="width:40%;" src="/img/productos/default-photo.jpg">
				</div>
				`);
			};
		}
	},


	carrito: function (req, res) {
		res.render('./pages/carrito');
	},

	borrarProducto: (req, res) => {
		let idProductoBuscado = req.params.id;
		let productosActualizados = productos.filter(product => product.id != idProductoBuscado);

		/* busco la foto a borrar para eliminarle la imagen */

		const productToDelete = productos.find((product) => product.id == req.params.id);
		const publicPath = path.join(__dirname, "../../public");
		console.log(publicPath);

		/* utilizo fs.existsSync para saber si existe una imagen física en nuestra carpeta estatica, si la tiene que la borre con fsUnlink, sino que no haga nada */

		if (fs.existsSync(path.join(publicPath, productToDelete.fotoDestacada))) {
			fs.unlinkSync(
				path.join(publicPath, productToDelete.fotoDestacada)
			);
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(productosActualizados, null, ' '));
		productos;
		res.redirect('/productos');
	}

}

module.exports = mainController;
