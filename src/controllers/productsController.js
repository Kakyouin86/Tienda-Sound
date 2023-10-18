const { getProductos,getDetalle,getCrear,getGuardarProducto,getEditarProducto,getActualizarProducto,
getBorrarProducto, getProductosNuevos, getProductosUsados, getCategoria, getProductosConEnvioGratis, getProductoConEnvioPago, getFiltroPrecio,
} = require('../services/productService');

let productsController = {
  productos: function(req, res) {
    getProductos(req,res);
  },  
  detalle: function(req, res){
		getDetalle(req,res);
	},
	crear: function (req, res){
    getCrear(req,res);
	},
  guardarProducto: async function (req, res) {
    getGuardarProducto(req,res);
  },
  editarProducto: function (req, res){
    getEditarProducto(req,res);
  },
  actualizarProducto: async function (req, res) {
    getActualizarProducto(req,res);
  },
  borrarProducto: async function (req, res){
    getBorrarProducto(req,res);
  },

  productosNuevos: function (req, res) {
    getProductosNuevos(req,res);
    
  },
  productosUsados: function (req, res) {
    getProductosUsados(req,res);
  },
  categoria: function(req, res){
    getCategoria();
  },
  productosConEnvioGratis: function (req, res) {
    getProductosConEnvioGratis(req,res);
  },

  productosConEnvioPago: function (req, res) {
    getProductoConEnvioPago(req,res);
  },

  filtroPrecio: async function (req, res) {
    getFiltroPrecio(req,res);
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