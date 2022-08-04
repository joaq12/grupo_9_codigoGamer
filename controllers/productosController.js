const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
var products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const { validationResult } = require("express-validator");

const db = require('../database/models');
const Product = require("../database/models/Product");
const OP = db.Sequelize.Op

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productosController = {

  search: (req,res) =>{
    db.Product.findAll({
        where:{
          name : {[OP.like]: "%" + req.query.search + "%"}
        }
      })
      .then(product =>{
        res.render ('productsList', {msg: " No hay resultados para la busqueda ingresada ", product, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged} );
    })
  },

  list: (req,res) => {
   db.Product.findAll({ order: [
    ['id_category', 'DESC'],
    ['name', 'DESC'],
],})
  .then(product =>{
      res.render ('productsList', { product, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged} );
  })

},

  detail: (req, res) => {
    const id = req.params.id;
    db.Product.findByPk( id, {include:{association:"category"}})
      .then((sproduct) => {
        if(sproduct){  
          res.render("product-detail", { sproduct, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged})          
        } else {
          res.render("ERROR", {noProdError : "El producto no existe en la base de datos", session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged})          
        }
      })
      .catch((e) => {
        console.log(e)
        res.send(e)
      })    
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
    db.Category.findOne({where:{
      id : req.params.id
    }})
    .then(category => {  
      if(category){  
        res.render("category-edit", {
        category, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged
      })
     } else {
      res.render("ERROR", {noCatgError : "La categoría no existe en la base de datos", session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged})          
    }
        })
     .catch((e) => {
       console.log(e)
       res.send(e)
     })
   },


   categoryUpdate:(req,res)=>{
    let categoryToEdit = db.Category.findByPk(req.params.id);
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
      console.log(response)
    res.redirect("/home")
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
    let errors = validationResult(req);
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
    
    if(errors.isEmpty()){
    db.Product.create(newProduct)
    .then(product => {
      let id = product.id
      res.redirect(`/product-detail/${id}`)
    })
    .catch(e => {
      console.log('----------- error creando producto -------------')
      console.log(e)
      console.log('-------------------------------------------------')
      res.redirect("/home")
    })
    }else{
      db.Category.findAll()
      .then(category =>{
        res.render("product-create", {category, errors:errors.errors , old:req.body,  session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
      })
    }
  },
 
 productEdit : (req, res) => {
   db.Product.findByPk(req.params.id,{include:{association:"category"}})
   .then((productToEdit) => {
     if(!productToEdit) {
      res.render("ERROR", {noUserError : "El producto no existe en la base de datos"})
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

 productUpdate: async (req,res)=> {
  let errors = validationResult(req);
  let productToEdit = await db.Product.findByPk(req.params.id,{include:{association:"category"}})
  if(req.files){
    req.files.forEach(imagen => {
        productToEdit[imagen.fieldname]=imagen.filename
    })
  }
  if(errors.errors.length > 0){
    console.log(errors.errors)
    return res.render("product-edit", {
      productToEdit,  errors:errors.errors , old:req.body})
  }

 if(errors.isEmpty()){
 const product = await db.Product.findOne({
   where:{
     id:req.params.id
   }
 });

 product.set({
   ...req.body,id:req.params.id
 });
  if(req.files){
    req.files.forEach(imagen => {
        product[imagen.fieldname]=imagen.filename
    })
  }
 await product.save()
 let id = req.params.id
 res.redirect(`/product-detail/${id}`)
  }


 },

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

};

module.exports = productosController;
