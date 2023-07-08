const fs = require('fs');
const path = require('path');

// Traemos los datos de json y lo convertimos a objeto lit.
const productsFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


let mainController = {
    // metodos de /
    index: function(req,res){
        res.render('./pages/home');
    },
    login: function(req,res){
        res.render('./pages/login');
    },
    register: function(req,res){
        res.render('./pages/register');
    },
    
    // metodos de productos
    
    // renderiza todos los productos en grid
    productos: function(req,res){
        res.render('./pages/productos', { producto: productos });
    },

    // detalle de un solo producto

    producto: function(req,res){
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
    renderCrearProducto: function(req,res){
        res.render('./pages/crearProducto');
    },

    // guardar los datos en json
    guardarProducto: function(req,res){
        let idNuevoProducto = productos[productos.length - 1].id + 1;

		let objNuevoProducto = {
			id: idNuevoProducto,
			nombreProducto: req.body.nombreProducto,
			descripcionProductoCorta: req.body.descripcionProductoCorta,
			precioProducto: parseInt(req.body.precioProducto),
			estadoProducto: req.body.estadoProducto,
			descripcionProductoLarga: req.body.descripcionProductoLarga,
			categoriaProducto: req.body.categoriaProducto,
			fotoDestacada: req.body.fotoDestacada
		}

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

		res.render('editarProducto', { producto: productoBuscado });
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
				break;
			}

		}
		fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '));
		res.redirect('/productos');

	},


   

    carrito: function(req,res){
        res.render('./pages/carrito');
    },
    
    




}

module.exports = mainController;
