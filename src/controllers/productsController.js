const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");
const User = require("../models/User");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');


let db = require ('../../database/models')



let productsController = {
	crear: function (req, res)
	{
        db.Categoria.findAll()
        .then (function(categoria){
            return res.render('./pages/crearProducto', { categoria: categoria });
        })
	}
}
module.exports = productsController;