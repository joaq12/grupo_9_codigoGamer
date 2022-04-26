const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require('./routes/mainRouter');
const productosRouter= require('./routes/productosRouter');
const loginRouter= require("./routes/loginRouter")
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.listen(3030, ()=>
console.log("Servidor Corriendo"));

app.use('/', mainRouter);
app.use('/',productosRouter);
app.use('/',loginRouter);

// app.use("/login", (req,res)=>{
//     res.sendFile(path.resolve(__dirname, "views/login"))});

// app.get("/product-cart", (req,res)=>{
//     res.sendFile(path.resolve(__dirname, "views/product-cart"))});

// app.get("/register", (req,res)=>{
//     res.sendFile(path.resolve(__dirname, "views/register"))});

// app.get("/store", (req,res)=>{
//     res.sendFile(path.resolve(__dirname, "views/store"))});

// app.get("/contact", (req,res)=>{
//     res.sendFile(path.resolve(__dirname, "views/contact"))});

// app.get("/cart", (req,res)=>{
//     res.sendFile(path.resolve(__dirname, "views/cart"))});


