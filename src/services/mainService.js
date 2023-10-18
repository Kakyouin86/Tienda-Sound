const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { Sequelize } = require('sequelize');


// Traemos los datos de json y lo convertimos a objeto lit.
let db = require("../database/models");
const { DataTypes } = require("sequelize");

// credenciales Cloudinary
cloudinary.config({
  cloud_name: "dlf8flk1o",
  api_key: "829857512934227",
  api_secret: "iTQRHKw1LiAeUUeO8jrfx3d_MVg",
});

function getIndex(req, res) {
    Promise.all([db.Producto.findAll(), db.Categoria.findAll()])
      .then(function ([productos, categorias]) {
        res.render("./pages/home", {
          producto: productos,
          categorias: categorias,
        });
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
      });
}

async function searching(req,res){
        const { "form-control": formControl } = req.query;
        try {
            if (formControl) {
              // Realiza una consulta para buscar productos que coincidan con el término de búsqueda
              const productos = await db.Producto.findAll({
                where: {
                  nombreProducto: {
                    [Sequelize.Op.like]: `%${formControl}%`, // Búsqueda con LIKE
                  },
                },
              });
        
              // Asegúrate de que la variable productos esté definida y luego renderiza la vista
              res.render("./pages/search", { productos, formControl });
            } else {
              // Si query es undefined, puedes manejarlo como desees, por ejemplo, mostrar todos los productos
              const productos = await db.Producto.findAll();
        
              // Asegúrate de que la variable productos esté definida y luego renderiza la vista
              res.render("./pages/search", { productos, formControl: "" }); // Query vacío para mostrar todos los productos
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error interno del servidor" });
          }
       
}



module.exports = {getIndex,searching}