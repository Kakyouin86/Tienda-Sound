const fs = require('fs');
const path = require('path');

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
  guardarProducto: async function (req, res) 
  {
    try {
    let imageBuffer
    if (!req.file) { 
        
      imageBuffer =  "1693608906899-imgProducto" // IMAGEN POR DEFECTO cuando no se carga una imagen

      await db.Producto.create({
      nombreProducto: req.body.nombreProducto,
      descripcionProductoCorta: req.body.descripcionProductoCorta,
      precioProducto:req.body.precioProducto,
      estadoProducto: req.body.estadoProducto,
      descripcionProductoLarga: req.body.descripcionProductoLarga,
      imagen: req.file ? customFilename : imageBuffer, 
      // ver TODO ESTO DE USER ID
      // usuario_id: req.session.userLogged,
      // userLogged.id,
      });

      res.redirect('/productos')

      } else {

		  imageBuffer = req.file.buffer;
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

      await db.Producto.create({
      nombreProducto: req.body.nombreProducto,
      descripcionProductoCorta: req.body.descripcionProductoCorta,
      precioProducto:req.body.precioProducto,
      estadoProducto: req.body.estadoProducto,
      descripcionProductoLarga: req.body.descripcionProductoLarga,
      imagen: req.file ? customFilename : imageBuffer, 
      // ver TODO ESTO DE USER ID
      // usuario_id: req.session.userLogged,
      // userLogged.id,
      });
    }
      res.redirect('/productos')
    } catch (error) {
      console.error('Error:', error);
    }   
  },
  editarProducto: function (req, res){
    let pedidoProductos = db.Producto.findByPk(req.params.id);
    let pedidoCategoria = db.Categoria.findAll()

    Promise.all([pedidoProductos, pedidoCategoria])
      .then(function ([producto, categoria]){
        res.render('./pages/editarProducto', {producto: producto, categoria: categoria})
      })
  },
  actualizarProducto: async function (req, res)
  {
    try {

		  let customFilename; // nombre de la imagen definida en la variable en CREATE
      
      if (req.file) {
		  const imageBuffer = req.file.buffer;
		  filenameUpdate = Date.now() + '-imgProducto';  // a la nueva imagen la redefino con otro nombre
		  const folderName = 'productos';

		  const uploadPromise = new Promise((resolve, reject) => {
			let stream = cloudinary.uploader.upload_stream({folder: folderName,resource_type: 'image', public_id: filenameUpdate}, (error, result) => {
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

      await db.Producto.update(
        {
          nombreProducto: req.body.nombreProducto,
          descripcionProductoCorta: req.body.descripcionProductoCorta,
          precioProducto: req.body.precioProducto,
          estadoProducto: req.body.estadoProducto,
          descripcionProductoLarga: req.body.descripcionProductoLarga,
          imagen: req.file ? filenameUpdate : customFilename,    
        },
        {
          where: {
            id: req.params.id
          }
        }
      );
      res.redirect('/productos/' + req.params.id);
    } catch (error) {
      console.error('Error:', error);
    }  
  },
  borrarProducto: async function (req, res)
  {
    try {
      await db.Producto.destroy({
          where: {
            id: req.params.id
          }
        });
        res.redirect('/productos');
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

module.exports = productsController;