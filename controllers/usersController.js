const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const db = require('../database/models');

var users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersController = {
  
  login: (req, res) => {
    res.render("user-login");
  },
  
  loginProcess: (req, res) => {
    let errors = validationResult(req);
  
    if (errors.isEmpty()) {

      db.User.findAll()
      
      .then(userList=>{
      
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].email == req.body.email) {
          if (bcrypt.compareSync(req.body.password, userList[i].password)) {
           let userToLogin = userList[i];
            req.session.usuarioLogged = userToLogin;
            return res.redirect("/");            
          } else {
            let passError = [{ msg: "La Contraseña ingresada es incorrecta" }];
            return res.render("user-login", {
              errors: errors.errors,
              passError: passError,
              old: req.body,
            });
          }

        }
      }
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].email !== req.body.email) {
          let error = [
            {
              msg: "Los datos ingresados no coinciden con ninguna cuenta registrada",
            },
          ];
          res.render("user-login", { error: error });
        }
      };
    
    })}},
  
      
  
  
  logout: (req, res) => {
    req.session.usuarioLogged = undefined;
    return res.redirect("/");
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
  
  registerProcess: (req, res) => {
    const errors = validationResult(req);
    let newUser = {
      name: null,
      lastName: null,
      dni: null,
      gender: null,
      bDate: null,
      password: null,
      phone: null,
      email: null,
      avatar: null,
      userType: null,
    };
      console.log(req.body)
      newUser.name = req.body.nombre,
      newUser.lastName = req.body.apellido,
      newUser.dni = req.body.dni,
      newUser.gender = req.body.sexo,
      newUser.bDate = req.body.fechaNac,
      newUser.password = (req.body.password1 == req.body.password1) 
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
      console.log(newUser)
      
      
      db.User.create(newUser)
      .then(newUser => {
      console.log(newUser)
      res.redirect("/")
    })
    .catch(e => {
      console.log(e)
      res.render("user-register", { errors: errors.errors, old: req.body });
    })
    },

  

  userDelete: (req, res) => {
    db.User.destroy({
      where: {
        id:req.params.id
      }}
    )
    .then(response =>{
      res.redirect("/")
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
        return res.render("index")
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
    res.redirect("/")
  })
  .catch((e) => {
    console.log(e)
    res.render("user-edit", { errors: errors.errors, old: req.body });
  })

},



  allUsers: (req, res) => {
  db.User.findAll()    
    .then(users=>{
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
