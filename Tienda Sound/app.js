//npm init
//npm install express

const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.resolve(__dirname, './public')));
app.use('/nmb', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))

app.get('/', (req, res) =>
{
    res.sendFile(path.resolve(__dirname, './views/home.html'))
});

app.listen(3000, () =>
{
    console.log("servidor corriendo")
});