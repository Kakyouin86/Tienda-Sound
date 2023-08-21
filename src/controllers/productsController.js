// const fs = require('fs');
// const path = require('path');

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

let db = require ('../../database/models')

// credenciales Cloudinary 
cloudinary.config({ 
	cloud_name: 'dlf8flk1o', 
	api_key: '829857512934227', 
	api_secret: 'iTQRHKw1LiAeUUeO8jrfx3d_MVg' 
});

let productsController = {
  productos: function(req, res)
  {
		db.Producto.findAll()
			.then (function(productos){
				res.render('./pages/productos', { productos: productos });
			})
	},
  detalle: function(req, res)
  {
		db.Producto.findByPk(req.params.id, {
      include: [{association: "Categoria"}]  //¿se incluyen todas las asociaciones?
    })
			.then (function(producto){
				res.render('./pages/producto', { producto: producto });
			})
	},
	crear: function (req, res)
	{
    db.Categoria.findAll()
      .then (function(categoria){
        return res.render('./pages/crearProducto', { categoria: categoria });
      })
	},
  guardarProducto: function (req, res) 
  {
    db.Producto.create({
      nombreProducto: req.body.nombreProducto,
      descripcionProductoCorta: req.body.descripcionProductoCorta,
      precioProducto:req.body.precioProducto,
      estadoProducto: req.body.estadoProducto,
      descripcionProductoLarga: req.body.descripcionProductoLarga,
      // stock: ,
      // imagen: , 
      // usuario_id: ,
      // marca_id: ,
      // puntuacion_id:
      });
      //console.log(req.body)
      res.redirect('/productos')    
  },
  editarProducto: function (req, res){
    let pedidoProductos = db.Producto.findByPk(req.params.id);
    let pedidoCategoria = db.Categoria.findAll()

    Promise.all([pedidoProductos, pedidoCategoria])
      .then(function ([producto, categoria]){
        res.render('./pages/editarProducto', {producto: producto, categoria: categoria})
      })
  },
  actualizarProducto: function (req, res){
    db.Producto.update({
      nombreProducto: req.body.nombreProducto,
      descripcionProductoCorta: req.body.descripcionProductoCorta,
      precioProducto:req.body.precioProducto,
      estadoProducto: req.body.estadoProducto,
      descripcionProductoLarga: req.body.descripcionProductoLarga,
      // stock: ,
      // imagen: , 
      // usuario_id: ,
      // marca_id: ,
      // puntuacion_id:
      }, {
        where: {
          id: req.params.id
        }
      });
      res.redirect('/productos/' + req.params.id);
  },
  
}

module.exports = productsController;