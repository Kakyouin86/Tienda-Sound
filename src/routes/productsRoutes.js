// Require´s
const express = require("express");
const router = express.Router();

// Controladores
const productsController = require("../controllers/productsController");

// Multer
const multer = require('multer');
const uploadProduct = multer();

// Rutas

// Todos los productos
router.get('/', productsController.productos);

// Crear producto
router.get('/crearProducto', productsController.crear);
router.post('/crearProducto', productsController.guardarProducto);

module.exports = router;