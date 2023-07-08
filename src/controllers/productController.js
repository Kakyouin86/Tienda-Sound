const fs = require('fs');
const path = require('path');

// Traemos los datos de json y lo convertimos a objeto lit.
const productsFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


let productController = {
    
    productos: function(req,res){
        res.render('./pages/productos', { producto: productos });
    },

	detail: function(req,res){
        let idProductoBuscado = req.params.id;
		let productoBuscado;
		for (let i = 0; i < productos.length; i++) {

			if (idProductoBuscado == productos[i].id) {
				productoBuscado = productos[i];
				console.log(productoBuscado);
			}

		}
		res.render('./pages/detail', { producto: productoBuscado });
    },
	

    carrito: function(req,res){
        res.render('./pages/carrito');
    },
    crearProducto: function(req,res){
        res.render('./pages/crearProducto');
    },
    editarProducto: function(req,res){
        res.render('./pages/editarProducto');
    }
}

module.exports = productController;


/*
const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', { product: products })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let idProductoBuscado = req.params.id;
		let productoBuscado;
		for (let i = 0; i < products.length; i++) {

			if (idProductoBuscado == products[i].id) {
				productoBuscado = products[i];
			}
		}
		res.render('detail', { product: productoBuscado });
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},

	// Create -  Method to store
	store: (req, res) => {

		let idNuevoProducto = products[products.length - 1].id + 1;

		let objNuevoProducto = {
			id: idNuevoProducto,
			name: req.body.name,
			description: req.body.description,
			price: parseInt(req.body.price),
			discount: parseInt(req.body.discount),
			image: 'reebok.jpeg',
			category: req.body.category
		}

		products.push(objNuevoProducto);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let idProductoBuscado = req.params.id;
		let productoBuscado;
		for (let i = 0; i < products.length; i++) {

			if (idProductoBuscado == products[i].id) {
				productoBuscado = products[i];
			}
		}

		res.render('product-edit-form', { product: productoBuscado });
	},
	// Update - Method to update
	update: (req, res) => {
		let idProductoBuscado = req.params.id;
		for (let i = 0; i < products.length; i++) {
			if (idProductoBuscado == products[i].id) {
				products[i].name = req.body.name;
				products[i].price = parseInt(req.body.price);
				products[i].discount = parseInt(req.body.discount);
				products[i].category = req.body.category;
				products[i].description = req.body.description;
				break;
			}

		}
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');

	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let idProductoBuscado = req.params.id;
		let productosActualizados = products.filter(product => product.id != idProductoBuscado);

		fs.writeFileSync(productsFilePath, JSON.stringify(productosActualizados, null, ' '));
		res.redirect('/');
	}
};


*/