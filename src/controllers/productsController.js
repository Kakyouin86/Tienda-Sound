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

let productsController = {
  productos: function(req, res) {
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
  },  
  detalle: function(req, res)
  {
		db.Producto.findByPk(req.params.id, {
      include: [{association: "Categoria"}]  //¿se incluyen todas las asociaciones?
    })
			.then (function(producto){
				res.render('./pages/producto', { 
          producto: producto, 
          user: req.session.userLogged, });
		  })
	},
	crear: function (req, res)
	{
    db.Categoria.findAll()
      .then (function(categoria){
        return res.render('./pages/crearProducto', { categoria: categoria });
      })
	},
  guardarProducto: async function (req, res) {
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
  },
  editarProducto: function (req, res){
    let pedidoProductos = db.Producto.findByPk(req.params.id);
    let pedidoCategoria = db.Categoria.findAll()
    Promise.all([pedidoProductos, pedidoCategoria])
      .then(function ([producto, categoria]){
        res.render('./pages/editarProducto', {producto: producto, categoria: categoria})
      })
  },
  actualizarProducto: async function (req, res) {
    try {
      // Validación Back End - actualizar producto
      const resultProductValidation = validationResult(req);
      console.log(resultProductValidation.errors.length + " cantidad de errores");
      if (resultProductValidation.errors.length > 0) {
        let pedidoProductos = db.Producto.findByPk(req.params.id);
        let pedidoCategoria = db.Categoria.findAll();
        Promise.all([pedidoProductos, pedidoCategoria])
          .then(function ([producto, categoria]) {
            return res.render("./pages/editarProducto", { errors: resultProductValidation.mapped(), producto: producto, categoria: categoria });
          });
      } else {
        let customFilename; // nombre de la imagen definida en la variable en CREATE
  
        if (req.file) {
          const imageBuffer = req.file.buffer;
          filenameUpdate = Date.now() + '-imgProducto'; // a la nueva imagen la redefino con otro nombre
          const folderName = 'productos';
          const uploadPromise = new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream({ folder: folderName, resource_type: 'image', public_id: filenameUpdate }, (error, result) => {
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
        await db.Producto.update(
          {
            nombreProducto: req.body.nombreProducto,
            descripcionProductoCorta: req.body.descripcionProductoCorta,
            precioProducto: req.body.precioProducto,
            estadoProducto: req.body.estadoProducto,
            descripcionProductoLarga: req.body.descripcionProductoLarga,
            stock: 3,
            fecha_alta: currentTimestamp,
            fecha_modificacion: null,
            fecha_baja: null,
            imagen: req.file ? filenameUpdate : customFilename,
            categoria_id: req.body.categoriaProducto,
            usuario_id: req.session.userLogged.id,
            marca_id: null,
            puntuacion_id: 1,
            envio: req.body.precioEnvio,
          },
          {
            where: {
              id: req.params.id
            }
          }
        );
        res.redirect('/productos/' + req.params.id);
      }
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
  },
  productosNuevos: function (req, res) {
    Promise.all([
      db.Producto.findAll({
        where: {
          estadoProducto: "Nuevo"
        }
      }),
      db.Categoria.findAll(),
    ])
      .then(function([productos, categorias]) {
        res.render('./pages/productos', { productos: productos, categorias: categorias });
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  productosUsados: function (req, res) {
    Promise.all([
      db.Producto.findAll({
        where: {
          estadoProducto: "Usado"
        }
      }),
      db.Categoria.findAll(),
    ])
      .then(function([productos, categorias]) {
        res.render('./pages/productos', { productos: productos, categorias: categorias });
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  categoria: function(req, res){
    Promise.all([
      db.Producto.findAll({
        where: {
          categoria_id: req.params.idCategoria
        }
      }),
      db.Categoria.findAll(),
    ])
      .then(function([productos, categorias]) {
        res.render('./pages/productos', { productos: productos, categorias: categorias });
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  productosConEnvioGratis: function (req, res) {
    Promise.all([
      db.Producto.findAll({
        where: {
          envio: 0
        }
      }),
      db.Categoria.findAll(),
    ])
      .then(function([productos, categorias]) {
        res.render('./pages/productos', { productos: productos, categorias: categorias });
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  productosConEnvioPago: function (req, res) {
    Promise.all([
      db.Producto.findAll({
        where: {
          envio: {
            [Op.ne]: 0
          }
        }
      }),
      db.Categoria.findAll(),
    ])
      .then(function([productos, categorias]) {
        res.render('./pages/productos', { productos: productos, categorias: categorias });
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  filtroPrecio: async function (req, res) {
    const { "form-priceMenor": formControlMenor } = req.query
    const { "form-priceMayor": formControlMayor } = req.query
    let menor = parseFloat(formControlMenor)
    let mayor = parseFloat(formControlMayor)
    try {
        const productos = await db.Producto.findAll({
            where: {
                precioProducto: {
                    [Op.gte]: menor, // Corrected the conditions
                    [Op.lte]: mayor
                }
            }
        });

        const categorias = await db.Categoria.findAll();
        res.render('./pages/buscarPorPrecio', { productos, categorias, menor, mayor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // APIs //

  todosLosProductos: (req, res) => {
    db.Producto.findAll()
      .then((productos) => {
        return res.json({ 
          total: productos.length,
          data: productos,
          status: 200
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  usados: (req, res) => {
    db.Producto.findAll({
      where: { estadoProducto: "Usado" }
    })
      .then((productos) => {
        return res.json({
          total: productos.length,
          data: productos
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  nuevos: (req, res) => {
    db.Producto.findAll({
      where: { estadoProducto: "Nuevo" }
    })
      .then((productos) => {
        return res.json({
          total: productos.length,
          data: productos
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  todasLasCategorias: (req, res) => {
    db.Categoria.findAll()
      .then((categorias) => {
        return res.json({ 
          total: categorias.length,
          data: categorias,
          status: 200
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  guitarrasYbajos: (req, res) => {
    db.Producto.findAll({
      where: { categoria_id: 1 }
    })
      .then((productos) => {
        return res.json({
          total: productos.length,
          data: productos
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  bateriaYpercusion: (req, res) => {
    db.Producto.findAll({
      where: { categoria_id: 2 }
    })
      .then((productos) => {
        return res.json({
          total: productos.length,
          data: productos
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  tecladosYsintetizadores: (req, res) => {
    db.Producto.findAll({
      where: { categoria_id: 3 }
    })
      .then((productos) => {
        return res.json({
          total: productos.length,
          data: productos
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  estudioDeGrabacion: (req, res) => {
    db.Producto.findAll({
      where: { categoria_id: 4 }
    })
      .then((productos) => {
        return res.json({
          total: productos.length,
          data: productos
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  vientos: (req, res) => {
    db.Producto.findAll({
      where: { categoria_id: 5 }
    })
      .then((productos) => {
        return res.json({
          total: productos.length,
          data: productos
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  cuerdas: (req, res) => {
    db.Producto.findAll({
      where: { categoria_id: 6 }
    })
      .then((productos) => {
        return res.json({
          total: productos.length,
          data: productos
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  envioGratis: (req, res) => {
    db.Producto.findAll({
      where: { envio: 0 }
    })
      .then((productos) => {
        return res.json({
          total: productos.length,
          data: productos
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  envioPago: (req, res) => {
    db.Producto.findAll({
      where: {
        envio: {
          [db.Sequelize.Op.not]: 0 // Usamos el operador not para obtener valores diferentes de cero
        }
      }
    })
      .then((productos) => {
        return res.json({
          total: productos.length,
          data: productos
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  }
}

module.exports = productsController;