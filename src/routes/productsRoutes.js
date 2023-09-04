// Require´s
const express = require("express");
const router = express.Router();

// Controladores
const productsController = require("../controllers/productsController");

// Multer
const multer = require('multer');
const uploadProduct = multer();

// RUTAS

// Todos los productos
router.get('/', productsController.productos);

// Crear producto
router.get('/crearProducto', productsController.crear);
router.post('/crearProducto', uploadProduct.single('fotoDestacada'), productsController.guardarProducto);

// Editar / Actualizar un producto
router.get('/editarProducto/:id', productsController.editarProducto);
router.patch('/editarProducto/:id', uploadProduct.single('fotoDestacada'), productsController.actualizarProducto);

// Eliminar un producto
router.post('/borrarProducto/:id', productsController.borrarProducto);

// Para ver productos usados
router.get('/productosUsados', productsController.productosUsados);

// Para ver productos nuevos
router.get('/productosNuevos', productsController.productosNuevos);

// Para ver productos con envío gratis
router.get('/productosConEnvioGratis', productsController.productosConEnvioGratis);

// Para ver productos con envío pago
router.get('/productosConEnvioPago', productsController.productosConEnvioPago);

// Para ver productos filtrados por precio
router.get('/searchprice', productsController.filtroPrecio);


// Detalle del producto
router.get('/:id?', productsController.detalle);  // falta carrousel, conflicto findByPK y findAll en una misma función

// Producto por categoria
router.get('/categoria/:idCategoria?', productsController.categoria);


module.exports = router;