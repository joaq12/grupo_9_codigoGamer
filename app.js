const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

app.listen(3000, ()=>
console.log("Servidor Corriendo"));

app.get("/", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "views/index.html"))});
    
app.get("/login", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "views/login.html"))});
    
app.get("/product-cart", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "views/product-cart.html"))});
    
app.get("/product-detail", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "views/product-detail.html"))});
        
app.get("/register", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "views/register.html"))});