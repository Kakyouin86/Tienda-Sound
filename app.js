//npm init
//npm install express
//npm i ejs

const mainRoutes = require('./src/routes/mainRoutes');

const express = require("express");
const path = require("path");
const app = express();
const methodOverride =  require('method-override');


app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.use('/nmb', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// seteado de EJS
app.set('view engine', 'ejs');


app.use('/', mainRoutes);


app.listen(3000, () =>
{
    console.log("Servidor corriendo en puerto 3000")
});