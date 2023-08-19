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
	crear: function (req, res)
	{
        db.Categoria.findAll()
        .then (function(categoria){
            return res.render('./pages/crearProducto', { categoria: categoria });
        })
	},
    guardarProducto: async function (req, res)
	{
        try {
            const imageBuffer = req.file.buffer;
            const customFilename = Date.now() + '-imgProducto';
            const folderName = 'productos';
  
      
            const uploadPromise = new Promise((resolve, reject) => {
              let stream = cloudinary.uploader.upload_stream({folder: folderName,resource_type: 'image', public_id: customFilename}, (error, result) => {
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
        
            db.Producto.create({
            nombreProducto: req.body.nombreProducto,
            descripcionProductoCorta: req.body.descripcionProductoCorta,
            precioProducto:req.body.precioProduct,
            estadoProducto: req.body.estadoProducto,
            descripcionProductoLarga: req.body.descripcionProductoLarga,
            // stock: req.body., TENEMOS QUE HACER EL LABEL STOCK
            imagen: customFilename
            // usuario_id: ,
            // marca_id: ,
            // puntuacion_id:
            });
            res.redirect('./pages/productos');
            console.log(nombreProducto)
            console.log(imagen)
	    
        } catch (error) {
            console.error('Error:', error);
        }
    },
}


module.exports = productsController;