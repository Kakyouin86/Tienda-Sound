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

router.get('/login', guestMiddleware, usersController.login);
// router.post('/login', usersController.loginProcess);

// router.get('/logout', usersController.logout);

// router.get('/profile', authMiddleware, usersController.profile);

router.get('/register', guestMiddleware, usersController.register);
router.post('/register', uploadAvatar.single('avatar'), usersController.guardarUser);

module.exports = router;