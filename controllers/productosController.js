const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
var products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productosController = {
  detail: (req, res) => {
    if (req.params.id - 1 < products.length) {
      res.render("product-detail", { sproduct: products[req.params.id - 1] });
    }
  },

  cart: (req, res) => {
    res.render("cart");
  },

  checkoutAdress: (req, res) => {
    res.render("checkout-adress");
  },

  checkoutConfirm: (req, res) => {
    res.render("checkout-confirm");
  },

  checkoutData: (req, res) => {
    res.render("checkout-data");
  },

  checkoutPayment: (req, res) => {
    res.render("checkout-payment");
  },

  checkoutShipping: (req, res) => {
    res.render("Checkout-shipping");
  },

  productCreate: (req, res) => {
    res.render("product-create");
  },

  

  createConfirm: (req, res) => {
    let newProduct = {
      id: null,
      name: null,
      photo1: null,
      photo2: null,
      photo3: null,
      photo4: null,
      catg: null,
      description: null,
      stock: null,
      price: null,
      shipping: null,
      discount: null,
    };

    (newProduct.name = req.body.name),
      (newProduct.description = req.body.description),
      (newProduct.discount = req.body.discount),
      (newProduct.catg = req.body.catg),
      (newProduct.price = req.body.price),
      (newProduct.shipping = req.body.shipping),
      (newProduct.stock = req.body.stock),
      (newProduct.id = products.length + 1);
   
     if(req.files){
      req.files.forEach(imagen => {
          newProduct[imagen.fieldname]=imagen.filename
      });
    }

    products.push(newProduct);
    let newData = JSON.stringify(products);
    fs.writeFileSync(productsFilePath, newData);
    res.redirect("/");
  },

  productEdit: (req, res) => {
    if (req.params.id - 1 < products.length) {
    res.render("product-edit", {
      productToEdit: products[req.params.id -1],
  })}},

  productUpdate:(req,res)=>{
    console.log(req.body)
    console.log(req.params)
    let productToEdit=products.find(
      (product)=>product.id == req.params.id);
      console.log(productToEdit)
      products.forEach(product=>{if(product.id==req.params.id){
        (product.name=req.body.name),
        (product.description=req.body.description),
        (product.discount=req.body.discount),
        (product.catg=req.body.catg),
        (product.price=req.body.price),
        (product.shipping=req.body.shipping),
        (product.stock=req.body.stock)
      }})
      let newData= JSON.stringify(products);
      fs.writeFileSync(productsFilePath, newData);
      res.redirect("/store")

  },


  delete: (req,res)=>{
    let productToDelete=(product)=>{
      if(product.id != req.params.id){
        return product}}                                          
    products=products.filter((productToDelete))                         
    let newDataBase = JSON.stringify(products);
    fs.writeFileSync(productsFilePath, newDataBase);
    res.redirect("/store");
  },

  
};

module.exports = productosController;
