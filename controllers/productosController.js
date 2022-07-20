const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
var products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const db = require('../database/models');
const Product = require("../database/models/Product");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productosController = {

  list: (req,res) => {

    db.Product.findAll()
  .then(product =>{
      console.log(product)
      res.render ('productsList', { product, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged} );
  })

},

  detail: (req, res) => {
    const id = req.params.id;
    db.Product.findByPk(id, {include:{association:"category"}})
      .then((sproduct) => {  
        if(sproduct === null){
          res.send("home")
        } else {  
          res.render("product-detail", {sproduct, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged})          
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

  categoryCreate: (req, res) => {
    db.Category.findAll()
    .then(category =>{
      res.render("category-create", {category, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
    })  },

  categoryConfirm: (req, res) => {
    const newCategory = {
      name: null,
      img: null
    }

    newCategory.name = req.body.name
    if(req.files){
      req.files.forEach(imagen => {
          newCategory[imagen.fieldname]=imagen.filename
      })
    }
  
    db.Category.create(newCategory)
    .then(resp => {
      res.redirect("/home")
    })
    .catch(e => {
      console.log(e)
    })
  },

  categoryEdit : (req, res) => {
    db.Category.findByPk(req.params.id,{include:{association:"product"}})
    .then((category) => {
      if(category === undefined) {
        return res.render("home")
        }else{  
          res.render("category-edit", {
            category, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged
        })
      }
    }
    )
     .catch((e) => {
       console.log(e)
       res.send(e)
     })
   },


   categoryUpdate:(req,res)=>{
    let categoryToEdit = db.Product.findByPk(req.params.id);
      categoryToEdit={
      name : req.body.name?req.body.name:name,
    };
    if(req.files){
      req.files.forEach(imagen => {
        categoryToEdit[imagen.fieldname]=imagen.filename
      })
    }
  
    db.Category.update(
      categoryToEdit
    ,{
      where: {
        id:req.params.id
      }
    })
    .then(response =>{
      res.redirect("/")
    })
    .catch((e) => {
      console.log(e)
      res.render(e)
    })
  
   },


   categoryDelete :(req,res)=>{
    db.Category.destroy({
      where: {
        id:req.params.id
      }}
    )
    .then(response =>{
      res.redirect("/home")
    })
    .catch((e) => {
      console.log(e)
      res.render(e)
    })
},

  productCreate: (req, res) => {
    db.Category.findAll()
      .then(category =>{
        res.render("product-create", {category, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
      })
  },

  createConfirm: (req, res) => {
    const newProduct = {
      name: req.body.name,
      photo1: null,
      photo2: null,
      photo3: null,
      id_category: req.body.catg,
      description: req.body.description,
      stock: req.body.stock,
      price: req.body.price,
      shipping: parseInt(req.body.shipping,10),
      discount:  parseInt(req.body.discount,10),
      discountAply:parseInt(req.body.discountAply,10)
    };
    if(req.files){
      req.files.forEach(imagen => {
          newProduct[imagen.fieldname]=imagen.filename
      })
    }
    console.log(newProduct)
    db.Product.create(newProduct)
    .then(newProduct => {
      console.log(newProduct)
      res.redirect("/home")
    })
    .catch(e => {
      console.log('----------- error creando producto -------------')
      console.log(e)
      console.log('-------------------------------------------------')
      res.redirect("/home")
    })
  },
 
 productEdit : (req, res) => {
   db.Product.findByPk(req.params.id,{include:{association:"category"}})
   .then((productToEdit) => {
     if(productToEdit === undefined) {
       return res.render("home")
       }else{  
         res.render("product-edit", {
           productToEdit, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged
       })
     }
   }
   )
    .catch((e) => {
      console.log(e)
      res.send(e)
    })
  },

 productUpdate:(req,res)=>{
  let productToEdit = db.Product.findByPk(req.params.id);
    productToEdit={
    name : req.body.name?req.body.name:name,
    price :req.body.price,
    id_category : req.body.catg,
    description : req.body.description,
    stock: req.body.stock,
    price: req.body.price,
    shipping : req.body.shipping?req.body.shipping:0,
    discount : req.body.discount?req.body.discount:0,
    discountAply : req.body.discountAply,
  };
  if(req.files){
    req.files.forEach(imagen => {
        productToEdit[imagen.fieldname]=imagen.filename
    })
  }

  db.Product.update(
    productToEdit
  ,{
    where: {
      id:req.params.id
    }
  })
  .then(response =>{
    res.redirect("/home")
  })
  .catch((e) => {
    console.log(e)
    res.render(e)
  })

 },

 //  let productToEdit={
 //  
 //      (product.name=req.body.name),
 //      (product.description=req.body.description ),
 //      (product.discount=req.body.discount === undefined ? false:true),
 //      (product.discountAply = req.body.discountAply),
 //      (product.catg=req.body.catg),
 //      (product.price=req.body.price),
 //      (product.shipping=req.body.shipping === undefined ? false:true),
 //      (product.stock=req.body.stock)

 //      if(req.files){
 //          req.files.forEach(imagen => {
 //          productToEdit[imagen.fieldname]=imagen.filename
 //          })};

 //    }})

 //  

 //    let newData= JSON.stringify(products);
 //    fs.writeFileSync(productsFilePath, newData);
 //    res.redirect("/store")

 //},


 delete: (req,res)=>{

    db.Product.destroy({
      where: {
        id:req.params.id
      }}
    )
    .then(response =>{
      res.redirect("/home")
    })
    .catch((e) => {
      console.log(e)
      res.render(e)
    })

},


 //delete: (req,res)=>{
 //  let productToDelete=(product)=>{
 //    if(product.id != req.params.id){
 //      return product}}                                          
 //  products=products.filter((productToDelete))                         
 //  let newDataBase = JSON.stringify(products);
 //  fs.writeFileSync(productsFilePath, newDataBase);
 //  res.render("store",{products, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
 //},

  
};

module.exports = productosController;
