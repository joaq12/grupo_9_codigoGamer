const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require('./routes/mainRouter');
const productosRouter= require('./routes/productosRouter');
const loginRouter= require("./routes/loginRouter");
const methodOverride =  require('method-override');
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.listen(3030, ()=>console.log("Servidor Corriendo"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));


app.use('/', mainRouter);
app.use('/',productosRouter);
app.use('/',loginRouter);



module.exports = app;