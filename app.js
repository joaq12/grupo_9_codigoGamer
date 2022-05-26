const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require('./routes/mainRouter');
const productosRouter= require('./routes/productosRouter');
const usersRouter= require("./routes/usersRouter");
const methodOverride =  require('method-override');
const cookieParser = require("cookie-parser");
const session=require('express-session');
const bcrypt=require('bcryptjs');
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.listen(3030, ()=>console.log("Servidor Corriendo"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({secret: "Shhh, It's a secret",resave: false,saveUninitialized: false,}));


app.use('/', mainRouter);
app.use('/',productosRouter);
app.use('/',usersRouter);



module.exports = app;