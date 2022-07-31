const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
var products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const { validationResult } = require("express-validator");

const db = require('../database/models');
const Product = require("../database/models/Product");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productosController = {

  list: (req,res) => {
   db.Product.findAll()
  .then(product =>{
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
          console.log(sproduct.category)  
          res.render("product-detail", {sproduct, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged})          
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
    db.Category.findAll({include:{association:"product"}})
    .then((categories) => { 
       let category = categories.filter((e) => {
        e.id == req.params.id
        })
      console.log(category)  
      res.render("category-edit", {
            category, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged
        })

      })
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
      res.redirect("/home")
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
        console.log(errors.errors)
        res.render("product-create", {category, errors:errors.errors , old:req.body,  session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged});
      })
    }
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
 await product.save()
 res.redirect("/home")
  }
    //db.Product.update(
    //    productToEdit,{ where: 
    //      {
    //        id:req.params.id
    //      }
    //      , 
    //      include:{association:"category"}
    //    })
    //.then(productToEdit =>{
    //    console.log(productToEdit);
    //    if(!errors.isEmpty()) {
    //      res.render("product-edit", {
    //        productToEdit, error:errors.errors, old:req.body})
    //    }else{
    //    res.redirect("/home")
    //    }
    //    })
    //.catch((e) => {
    //  console.log(e)
    //    })
  
      //   const productUpdate = async (req, res) =>{
      //     const errors = validationResult(req);
      //     let productToEdit = {...req.body,id:req.params.id}
      //     if (errors.errors.length > 0) {
      //         return res.render("./product/productAdmin", {
      //             cervezaToEdit,
      //             errors: resultValidation.mapped(),
      //             oldData: req.body,
      //         });
      //     }
      
      //     const cerveza = await Product.findOne({
      //         where:{id:req.params.id}
      //     }); 
      //     cerveza.set({
      //         name: req.body.name,
      //         description: req.body.description,
      //         price: req.body.price,
      //         bitterness: req.body.bitterness,
      //         color: req.body.color,
      //         alcohol: req.body.alcohol,
      //         carbonation: req.body.carbonation,
      //         hop: req.body.hop,
      //         category: req.body.category,
      //         image: req.file?req.file.filename:req.body.image
      //     })
      //     await cerveza.save();
      //     res.redirect('/product/productPage')
      
      // }


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
