// Require´s
const express = require("express");
const router = express.Router();

const validations = require("./../middlewares/registerValidation");
const guestMiddleware = require("./../middlewares/guestMiddleware");
const authMiddleware = require("./../middlewares/authMiddleware");


// Controladores
const usersController = require("../controllers/usersController");

// Multer
const multer = require('multer');
const uploadAvatar = multer();

// RUTAS

// Perfil
router.get('/profile', authMiddleware, usersController.profile);

// Crear usuario
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', uploadAvatar.single('avatar'), validations, usersController.guardarUser);

//Ingresar al usuario
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);

// Editar usuario
router.get('/editarUser/:id', usersController.editarUser);
router.patch('/editarUser/:id', uploadAvatar.single('avatar'), usersController.actualizarUser);

// Eliminar usuario
router.delete('/borrarUser/:id', usersController.borrarUser);

// Cerrar sesión
router.get('/logout', usersController.logout);

//Ver mis productos
router.get('/misProductos/:id', usersController.misProductos);

module.exports = router;