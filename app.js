//npm init
//npm install express
//npm i ejs

const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.resolve(__dirname, './public')));
app.use('/nmb', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>
{
    res.sendFile(path.resolve(__dirname, './views/pages/home.html'))
});

app.get('/carrito', (req, res) =>
{
    res.sendFile(path.resolve(__dirname, './views/pages/carrito.html'))
});

app.get('/login', (req, res) =>
{
    res.sendFile(path.resolve(__dirname, './views/pages/login.html'))
});

app.get('/producto', (req, res) =>
{
    res.sendFile(path.resolve(__dirname, './views/pages/producto.html'))
});

app.get('/producto3', (req, res) =>
{
    res.sendFile(path.resolve(__dirname, './views/pages/producto3.html'))
});

app.get('/register', (req, res) =>
{
    res.sendFile(path.resolve(__dirname, './views/pages/register.html'))
});

app.listen(3000, () =>
{
    console.log("Servidor corriendo en puerto 3000")
});