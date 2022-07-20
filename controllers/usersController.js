const fs = require("fs");
const {body}= require('express-validator');
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const db = require('../database/models');

var users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersController = {

  registerProcess: (req, res) => {
    let errors = validationResult(req);
    let newUser = {}
    if(errors.isEmpty()){
      newUser.name = req.body.nombre,
            newUser.lastName = req.body.apellido,
            newUser.dni = req.body.dni,
            newUser.gender = req.body.sexo,
            newUser.bDate = req.body.fechaNac,
            newUser.password = (req.body.password1 == req.body.password2) 
            ? bcrypt.hashSync(req.body.password1, 10)
            :null,
            newUser.phone = req.body.tel,
            newUser.email = (req.body.email1 == req.body.email2) 
            ? req.body.email1
            :null,
            newUser.userType = req.body.userClass,
            newUser.avatar = req.file != undefined 
            ? req.file.filename 
            : "default.png";
    }else{
      res.render("user-register", {errors:errors.errors , old:req.body})
    }
     
     if(newUser){
       db.User.create(newUser)
       .then(newUser => {
       res.redirect("/home")
  
       })
       .catch(e => {
       console.log("error de validacion")   
       })
     }
  },
  
  login: (req, res) => {
    res.render("user-login");
  },
  
  loginProcess: (req, res) => {
    let errors = validationResult(req);
  

      db.User.findAll()
      
      .then(userList=>{
      if(errors.isEmpty()){
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].email == req.body.email && bcrypt.compareSync(req.body.password, userList[i].password)) {
          if(errors.isEmpty()){ 
          let userToLogin = userList[i];
          req.session.usuarioLogged = userToLogin;
          res.redirect("/home");                         
      }
        }}}else{
         res.render("user-login", {
         errors: errors.errors,
         old: req.body,})
         }})},
  
      
  
  
  logout: (req, res) => {
    req.session.usuarioLogged = undefined;
    return res.redirect("/home");
  },

  register: (req, res) => {
    return res.render("user-register");
  },
  
  
  ghest: (req, res) => {
    res.render("ghestUser", {
      session:
      req.session.usuarioLogged === undefined
      ? null
      : req.session.usuarioLogged,
    });
  },
  
  auth: (req, res) => {
    res.render("authUser", {
      session:
      req.session.usuarioLogged === undefined
      ? null
      : req.session.usuarioLogged,
    });
  },
  

  

  userDelete: (req, res) => {
    db.User.destroy({
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

  
  userEdit: (req, res) => {
    db.User.findByPk(req.params.id)
    .then((userToEdit) => {
      if(userToEdit === undefined) {
        return res.render("home")
        }else{  
          res.render("user-edit", {
            userToEdit,old: req.body, session:req.session.usuarioLogged === undefined ? null : req.session.usuarioLogged
        })
      }
    }
    )
    .catch((e) => {
      console.log(e)
       res.send(e)
     })
   },

   userUpdate:(req,res)=>{
     let userToEdit = db.Product.findByPk(req.params.id);
    userToEdit ={name: req.body.nombre?req.body.nombre:name,
      lastName:req.body.apellido?req.body.apellido:lastName,
      dni:req.body.dni?req.body.dni:dni,
      gender:req.body.sexo?req.body.sexo:gender,
    bDate:req.body.fechaNac?req.body.fechaNac:bDate,
    phone: req.body.tel?req.body.tel:phone,
  }
  userToEdit.avatar =  req.file != undefined 
  ? req.file.filename 
  : userToEdit.avatar;
 
  db.User.update(userToEdit
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
    res.render("user-edit", { errors: errors.errors, old: req.body });
  })

},



  allUsers: (req, res) => {
  db.User.findAll()    
    .then(users=>{
      console.log(users)
      res.render("users",{users,
      session : req.session.usuarioLogged === undefined
          ? null
          : req.session.usuarioLogged,
  })})
  .catch((e) => 
    console.log(e)
)},
      

    
  userDetails: (req, res) => {
    db.User.findByPk(req.params.id)    
    .then(user=>{
      res.render("user-profile",{user,
      session : req.session.usuarioLogged === undefined
          ? null
          : req.session.usuarioLogged,
  })})
  .catch((e) => 
    console.log(e)
  )}
}

    module.exports = usersController;
