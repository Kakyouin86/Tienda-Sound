// Require´s
const express = require("express");
const router = express.Router();

// Middlewares
//const uploadProduct = require('./../middlewares/multerProductMiddleware');
//const uploadAvatar = require('./../middlewares/multerAvatarMiddleware');
// const validations = require("./../middlewares/registerValidation");
// const guestMiddleware = require("./../middlewares/guestMiddleware");
// const authMiddleware = require("./../middlewares/authMiddleware");

// Controladores
const mainController = require("../controllers/mainController");

const multer = require('multer');
const uploadProduct = multer();
const uploadAvatar = multer();

// Rutas
router.get('/', mainController.index);

// router.get('/login', guestMiddleware, mainController.login);
// router.post('/login', mainController.loginProcess);
// router.get('/logout', mainController.logout);
// router.get('/profile', authMiddleware, mainController.profile);


// router.get('/producto/:id?', mainController.producto);
// router.get('/productos', mainController.productos);
// router.get('/productosNuevos', mainController.productosNuevos);
// router.get('/productosUsados', mainController.productosUsados);

router.get('/carrito', mainController.carrito);

//router.get('/crearProducto', mainController.renderCrearProducto);
//router.post('/crearProducto', uploadProduct.single('fotoDestacada'), mainController.guardarProducto);
//router.get('/editarProducto/:id', mainController.renderEditarProducto);
//router.put('/editarProducto/:id', uploadProduct.single('fotoDestacada'), mainController.editarProducto);
//router.delete('/borrarProducto/:id', mainController.borrarProducto);


// router.get('/register', guestMiddleware, mainController.register);
// router.post('/register', uploadAvatar.single('avatar'), validations, mainController.guardarUser);


module.exports = router;