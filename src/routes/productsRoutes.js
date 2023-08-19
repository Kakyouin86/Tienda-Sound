// Require´s
const express = require("express");
const router = express.Router();

// Controladores
const productsController = require("../controllers/productsController");

// Multer
const multer = require('multer');
const uploadProduct = multer();

// Rutas

//Crear
router.get('/crearProducto', productsController.crear);
router.post('/crearProducto', uploadProduct.single('fotoDestacada'), productsController.guardarProducto);


module.exports = router;