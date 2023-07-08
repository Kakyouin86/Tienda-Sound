const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

const productController = require("../controllers/productController");


router.get('/', productController.productos);

router.get('/detail/:id?', productController.detail);

router.get('/carrito', productController.carrito);

router.get('/crearProducto', productController.crearProducto);

router.get('/editarProducto', productController.editarProducto);

module.exports= router;