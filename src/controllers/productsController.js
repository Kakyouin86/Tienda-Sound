const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");
const User = require("../models/User");
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
  productos:function(req, res){
		db.Producto.findAll()
			.then (function(productos){
				return res.render('./pages/productos', { productos: productos });
			})
	},
	crear: function (req, res)
	{
        db.Producto.findAll()
        .then (function(producto){
            return res.render('./pages/crearProducto', { producto: producto });
        })
	},
  guardarProducto: function (req, res) {
            db.Producto.create({
            nombreProducto: req.body.nombreProducto,
            // descripcionProductoCorta: req.body.descripcionProductoCorta,
            // precioProducto:req.body.precioProduct,
            // estadoProducto: req.body.estadoProducto,
            // descripcionProductoLarga: req.body.descripcionProductoLarga,
            // stock: req.body., TENEMOS QUE HACER EL LABEL STOCK
            // imagen: customFilename
            // usuario_id: ,
            // marca_id: ,
            // puntuacion_id:
            });
            res.redirect('/productos')
    }
}


module.exports = productsController;