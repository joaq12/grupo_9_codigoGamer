const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
const {validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');

var users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersController={
 
  userDetails:(req,res)=>{
    if (req.params.id - 1 < users.length) {
      res.render("user-profile", { user: users[req.params.id - 1] });
    }
  },
  
  registerProcess:(req,res)=>{
    const errors=validationResult(req);
    let newUser = {
        id: null,
        name: null,
        lastName:null,
        dni:null,
        gender:null,
        birthDay:null,
        password1:null,
        password2:null,
        contactNumber:null,
        email1:null,
        email2:null,
        profilePhoto:null,
        userClass:null,          
      };
     
        (newUser.name = req.body.nombre),
        (newUser.lastName=req.body.apellido),
        (newUser.dni = req.body.dni),
        (newUser.gender = req.body.sexo),
        (newUser.birthDay = req.body.fechaNac),
        (newUser.password1 = bcrypt.hashSync(req.body.password1,10)),
        (newUser.password2 = bcrypt.hashSync(req.body.password2,10)),
        (newUser.contactNumber = req.body.tel),
        (newUser.email1=req.body.email1),
        (newUser.email2=req.body.email2),
        (newUser.userClass=req.body.userClass),
        (newUser.id = users.length + 1),
        (newUser.profilePhoto=req.file.filename)
        
    if(errors.isEmpty()){

        users.push(newUser);
          let newData = JSON.stringify(users,null,' ');
          fs.writeFileSync(usersFilePath, newData);
          res.redirect("/"); 
        }
          else{
        
          res.render('user-register',{errors,old:req.body})
          }
  },

  userDelete: (req,res)=>{
    let userToDelete=(user)=>{
      if(user.id != req.params.id){
        return user}}                                          
    users=users.filter((userToDelete))                         
    let newDataBase = JSON.stringify(users);
    fs.writeFileSync(usersFilePath, newDataBase);
    res.redirect("user-login");
  }, 
          
  userEdit: (req, res) => {
    if (req.params.id - 1 < users.length) {
    res.render("user-edit", {
      userToEdit: users[req.params.id -1],users
      
  })}},
  
  userUpdate:(req,res)=>{
  
    let userToEdit=users.find(
      (user)=>user.id == req.params.id)
      console.log(userToEdit)
      
    users.forEach(user=>{if(user.id==req.params.id){
      (user.name = req.body.nombre);
      (user.lastName=req.body.apellido);
      (user.gender = req.body.sexo);
      (user.birthDay = req.body.fechaNac);
      //(user.password = bcrypt.hashSync(req.body.password1,10)),
      (user.contactNumber = req.body.tel);
      (user.email=req.body.email),
      (user.userClass=req.body.userClass);
      (user.profilePhoto=req.file.filename);
    }})
      let newData= JSON.stringify(users);
      fs.writeFileSync(usersFilePath, newData);
      res.redirect("/");
    
    },
    
  login:(req,res)=>{
    res.render('user-login')
   },
   
  loginProcess :(req, res) => {
    let errors = validationResult(req)
    if(errors.isEmpty()){
      let userList ;
    if(users == ""){
      userlist = [];
    }else{
        usersList = users 
      }
    for(let i=0 ; i<users.length ; i++) {
      if(userList[i].email == req.body.email){
        if(bcryptjs.compareSync(req.body.password,userlist[i].password)){
          const usuerToLogin = userList[i]
          console.log(userToLogin)
        }
      }
      if(usuerToLogin == undefinded){
        return res.render("user-login", {errors:[
           {msg : "Credenciales Invalidas"}
        ]})
      }
      req.session.usuariologged = userToLogin;
      res.render("usuario Logueado")
    }

    }else{
      return res.render("user-login", {errors:errors.errors})
      
    }


  },
  
  register :(req,res)=>{        
    res.render('user-register')
  },

  allUsers:(req,res)=>{
    res.render('users',{users})
  },
};

    
  
module.exports=usersController;