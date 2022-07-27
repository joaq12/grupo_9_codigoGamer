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
    if(errors.isEmpty()){
      db.User.findOne({ where: { email: req.body.email1 }, raw:true })
        .then(user => {
          if(!user){
		          db.User.create({
            	name : req.body.nombre,
            	lastName : req.body.apellido,
            	dni : req.body.dni,
            	gender : req.body.sexo,
            	bDate : req.body.fechaNac,
            	password : (req.body.password1 == req.body.password2) 
            ? bcrypt.hashSync(req.body.password1, 10)
            :null,
            	phone : req.body.tel,
            	email : (req.body.email1 == req.body.email2) 
            ? req.body.email1
            :null,
           	userType : req.body.userClass != undefined
            ? req.body.userClass 
            : "Cliente",
            	avatar : req.file != undefined  
            ? req.file.filename 
            : "default.png"
          })
		      .then(user=>{
		      	res.redirect("/home")
		      }) 
		      }else{
             res.render("user-register", {errors:[
               {
                 msg: 'El email ya esta registrado',
                 param: 'email1',
               }
             ] , old:req.body})
          }                    
        })
    }else{
      console.log(errors.errors)
      res.render("user-register", {errors:errors.errors , old:req.body})
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
            if (userList[i].email == req.body.email ){
              let userToLogin = userList[i];
              if(bcrypt.compareSync(req.body.password, userList[i].password)){
                req.session.usuarioLogged = userToLogin;
                return res.redirect("/home");
              }else {
                res.render("user-login", {errors:[
                {
                msg: 'La contraseña ingresada es incorrecta',
                param: 'password',
                }
                ] , old:req.body})
              }                         
            }
          }
          
          for (let i = 0; i < userList.length; i++) {
            if(!(userList[i].email == req.body.email )){
              res.render("user-login", {errors:[
              {
              msg: 'El email no se encuentra registrado en la base de datos',
              param: 'email',
              }
              ] , old:req.body})
            }
          }
        }else{
          res.render("user-login", {
          errors: errors.errors,
          old: req.body,})
        }
      })
      .catch(e=>{
        console.log(e)
      })
  },
  
      
  
  
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
