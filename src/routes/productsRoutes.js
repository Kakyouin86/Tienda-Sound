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
router.post('/crearProducto', productsController.guardarProducto);

// Editar / Actualizar un producto
router.get('/editarProducto/:id', productsController.editarProducto);
router.post('/editarProducto/:id', productsController.actualizarProducto);

// Eliminar un producto
router.post('/borrarProducto/:id', productsController.borrarProducto);


// Detalle del producto
router.get('/:id?', productsController.detalle);  // sección de Kiara, corregir desde linea 129 (for)

module.exports = router;