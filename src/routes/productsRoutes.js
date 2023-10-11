// Require´s
const express = require("express");
const router = express.Router();

const productValidations = require("./../middlewares/productValidation");
const productEditValidations = require("./../middlewares/productEditValidation");

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
router.post('/crearProducto', uploadProduct.single('fotoDestacada'), productValidations, productsController.guardarProducto);

// Editar / Actualizar un producto
router.get('/editarProducto/:id', productsController.editarProducto);
router.patch('/editarProducto/:id', uploadProduct.single('fotoDestacada'), productEditValidations, productsController.actualizarProducto);

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
router.get('/buscarPorPrecio', productsController.filtroPrecio);


// Detalle del producto
router.get('/:id?', productsController.detalle);  // falta carrousel, conflicto findByPK y findAll en una misma función

// Producto por categoria
router.get('/categoria/:idCategoria?', productsController.categoria);


// APIs

// Todos los productos
router.get('/api/todoslosproductos', productsController.todosLosProductos);

// Todos los productos USADOS
router.get('/api/usados', productsController.usados);

// Todos los productos NUEVOS
router.get('/api/nuevos', productsController.nuevos);

// Todas las categorias
router.get('/api/todaslascategorias', productsController.todasLasCategorias);

// Todos los productos: CATEGORIA 1: guitarras y bajos
router.get('/api/categoria1', productsController.guitarrasYbajos);

// Todos los productos: CATEGORIA 2: bateria y percusion
router.get('/api/categoria2', productsController.bateriaYpercusion);

// Todos los productos: CATEGORIA 3: teclados y sintetizadores
router.get('/api/categoria3', productsController.tecladosYsintetizadores);

// Todos los productos: CATEGORIA 4: estudio de grabacion y dj´s
router.get('/api/categoria4', productsController.estudioDeGrabacion);

// Todos los productos: CATEGORIA 5: vientos
router.get('/api/categoria5', productsController.vientos);

// Todos los productos: CATEGORIA 6: cuerdas
router.get('/api/categoria6', productsController.cuerdas);

// Todos los productos: ENVIO GRATIS
router.get('/api/enviogratis', productsController.envioGratis);

// Todos los productos: ENVIO PAGO
router.get('/api/enviopago', productsController.envioPago);


module.exports = router;