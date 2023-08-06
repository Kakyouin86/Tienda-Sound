const express = require("express");
const path = require("path");
const app = express();
const multer = require('multer');
const router = express.Router();
const mainController = require("../controllers/mainController");
const validations = require("./../middlewares/registerValidation")
const guestMiddleware = require("./../middlewares/guestMiddleware")
const authMiddleware = require("./../middlewares/authMiddleware")

/* configuración del almacenamiento de multer */
const storage = multer.diskStorage({
    destination: function (req, file, cb)
    {
        cb(null, path.join(__dirname, '../../public/img/productos'));
    },
    filename: function (req, file, cb)
    {
        let imageName = Date.now() + file.originalname;   // milisegundos y extensión de archivo original
        cb(null, imageName);
    },
});

//requerir express validator

const upload = multer({ storage: storage });
router.get('/', mainController.index);
router.get('/login', guestMiddleware, mainController.login);
router.post('/login', mainController.loginProcess);
router.post('/logout', mainController.logout);
router.get('/profile', authMiddleware, mainController.profile);
router.get('/producto/:id?', mainController.producto);
router.get('/productos', mainController.productos);
router.get('/productosNuevos', mainController.productosNuevos);
router.get('/productosUsados', mainController.productosUsados);
router.get('/carrito', mainController.carrito);
router.get('/crearProducto', mainController.renderCrearProducto);
router.post('/crearProducto', upload.single('fotoDestacada'), mainController.guardarProducto);
router.get('/editarProducto/:id', mainController.renderEditarProducto);
router.put('/editarProducto/:id', upload.single('fotoDestacada'), mainController.editarProducto);
router.delete('/borrarProducto/:id', mainController.borrarProducto);
router.get('/register', guestMiddleware, mainController.register);
router.post('/register', validations, mainController.guardarUser);
module.exports = router;