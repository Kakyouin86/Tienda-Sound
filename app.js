//npm init
//npm install express
//npm i ejs

const mainRoutes = require('./src/routes/mainRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');

const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.resolve(__dirname, './public')));
app.use('/nmb', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// seteado de EJS
app.set('view engine', 'ejs');


// seteo de enrutadores
app.use('/', mainRoutes);
app.use('/productos', productRoutes);
app.use('/usuarios', userRoutes);

app.listen(3000, () =>
{
    console.log("Servidor corriendo en puerto 3000")
});