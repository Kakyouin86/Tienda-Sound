// Require´s
const express = require("express");
const router = express.Router();

// Controladores
const productsController = require("../controllers/productsController");

// Rutas
router.get('/crearProducto', productsController.crear);


module.exports = router;