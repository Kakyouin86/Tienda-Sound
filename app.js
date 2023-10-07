//npm init
//npm install express
//npm i ejs
const mainRoutes = require('./src/routes/mainRoutes');
const productsRoutes = require('./src/routes/productsRoutes');
const usersRoutes = require('./src/routes/usersRoutes');



const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware")
const cors = require('cors');

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
	secret: "Hola. Esto es secreto",
	resave: false,
	saveUninitialized: false
}));
app.use(cookies());
app.use(userLoggedMiddleware);

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.use('/nmb', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// seteado de EJS
app.set('view engine', 'ejs');

app.use(cors());

app.use('/', mainRoutes);
app.use('/productos', productsRoutes);
app.use('/users', usersRoutes);



app.use((req, res, next) => 
{ 
    res.status(404).render('pages/not-found'); 
});

app.listen(3000, () =>
{
    console.log("Servidor corriendo en puerto 3000")
});