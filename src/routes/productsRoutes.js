// Require´s
const express = require("express");
const router = express.Router();

// Controladores
const productsController = require("../controllers/productsController");

// Multer
const multer = require('multer');
const uploadProduct = multer();

// Rutas

//lectura de productos
router.get('/', productsController.productos);

//Crear
router.get('/crearProducto', productsController.crear);
router.post('/crearProducto', productsController.guardarProducto);


module.exports = router;