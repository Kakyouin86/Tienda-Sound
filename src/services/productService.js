const fs = require('fs');
const path = require('path');

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { validationResult } = require("express-validator");

let db = require("../database/models");
const { DataTypes } = require('sequelize');
const { Op } = require('sequelize');


// credenciales Cloudinary 
cloudinary.config({ 
	cloud_name: 'dlf8flk1o', 
	api_key: '829857512934227', 
	api_secret: 'iTQRHKw1LiAeUUeO8jrfx3d_MVg' 
});


function getProductos(req,res){
    Promise.all([
      db.Producto.findAll(),
      db.Categoria.findAll(),
    ])
      .then(function([productos, categorias]) {
        res.render('./pages/productos', { productos: productos, categorias: categorias });
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
}

function getDetalle(req,res){
  
	db.Producto.findByPk(req.params.id, {
      include: [{association: "Categoria"}]  //¿se incluyen todas las asociaciones?
    })
			.then (function(producto){
				res.render('./pages/producto', { 
          producto: producto, 
          user: req.session.userLogged, });
		  })	
}

function getCrear(req,res){
    db.Categoria.findAll()
    .then (function(categoria){
     return res.render('./pages/crearProducto', { categoria: categoria });
    })
}

async function getGuardardo(req,res){
    try {

      // Validación Back End - guardar producto
      const resultProductValidation = validationResult(req);
      if (resultProductValidation.errors.length > 0) {
        return res.render("./pages/crearProducto", {
          errors: resultProductValidation.mapped(),
          oldData: req.body,
          producto: producto
        });
      }
        // Elimino la condición de que suba una imagen por defecto
        if (!req.file) {
          customFilename = "u5ennu5n5mdnx0yxjblm"; // IMAGEN POR DEFECTO cuando no se carga una imagen
        } else {
        imageBuffer = req.file.buffer;
        customFilename = Date.now() + '-imgProducto';
        const folderName = 'productos';
        const uploadPromise = new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream({ folder: folderName, resource_type: 'image', public_id: customFilename }, (error, result) => {
            if (error) {
              console.error('Error during upload:', error);
              reject(error);
            } else {
              console.log('Upload successful:', result);
              resolve(result);
            }
          });
          streamifier.createReadStream(imageBuffer).pipe(stream);
        });
        const uploadedImage = await uploadPromise;
        }
      const currentTimestamp = new Date();
      await db.Producto.create({
        nombreProducto: req.body.nombreProducto,
        descripcionProductoCorta: req.body.descripcionProductoCorta,
        precioProducto: req.body.precioProducto,
        estadoProducto: req.body.estadoProducto,
        descripcionProductoLarga: req.body.descripcionProductoLarga,
        stock: 3,
        fecha_alta: currentTimestamp,
        fecha_modificacion: null,
        fecha_baja: null,
        imagen: customFilename,
        categoria_id: req.body.categoriaProducto,
        usuario_id: req.session.userLogged.id,
        marca_id: null,
        puntuacion_id: 1,
        envio: req.body.precioEnvio
      });
      res.redirect('/productos');
    } catch (error) {
      console.error('Error:', error);
    }
  }


module.exports = {
    getProductos,
    getDetalle,
    getCrear,
    getGuardardo
}