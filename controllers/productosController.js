const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
var products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const db = require('../database/models');

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productosController = {
  detail: (req, res) => {

    const id = req.params.id;

    db.Product.findByPk(id)
      .then((response) => {
        
        if(response === null){
          res.send("index")
        } else {
          
          res.send(response)

        }
      })
      .catch((e) => {
        console.log(e)
        res.send(e)
      })
    
    // let product = products.find(producto => producto.id == parseInt(req.params.id))
    // if(product === undefined) return res.render("index")
    // res.render("product-detail", { sproduct: product, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
    
  },

  cart: (req, res) => {
    res.render("cart", { sproduct: products, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
  },

  checkoutAdress: (req, res) => {
    res.render("checkout-adress", {session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
  },

  checkoutConfirm: (req, res) => {
    res.render("checkout-confirm", {session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
  },

  checkoutData: (req, res) => {
    res.render("checkout-data", {session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
  },

  checkoutPayment: (req, res) => {
    res.render("checkout-payment", {session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
  },

  checkoutShipping: (req, res) => {
    res.render("Checkout-shipping", {session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
  },

  productCreate: (req, res) => {
    res.render("product-create", {session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
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
      discountAply:null
    };

    (newProduct.name = req.body.name),
      (newProduct.description = req.body.description),
      (newProduct.discount = req.body.discount),
      (newProduct.discountAply = req.body.discountAply),
      (newProduct.catg = req.body.catg),
      (newProduct.price = req.body.price),
      (newProduct.shipping = req.body.shipping),
      (newProduct.stock = req.body.stock),
      (newProduct.id = Date.now());
   
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
    let product = products.find(producto => producto.id == parseInt(req.params.id))
    if(product === undefined) return res.render("index")
    res.render("product-edit", {
      productToEdit: product, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged
  })},

  productUpdate:(req,res)=>{
    let productToEdit=products.find(
      (product)=>product.id === parseInt(req.params.id));
      products.forEach(product=>{if(product.id === parseInt(req.params.id)){
        (product.name=req.body.name),
        (product.description=req.body.description ),
        (product.discount=req.body.discount === undefined ? false:true),
        (product.discountAply = req.body.discountAply),
        (product.catg=req.body.catg),
        (product.price=req.body.price),
        (product.shipping=req.body.shipping === undefined ? false:true),
        (product.stock=req.body.stock)

        if(req.files){
            req.files.forEach(imagen => {
            productToEdit[imagen.fieldname]=imagen.filename
            })};

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
    res.render("store",{products, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
  },

  
};

module.exports = productosController;
