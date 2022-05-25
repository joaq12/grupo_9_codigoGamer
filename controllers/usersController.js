const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
var users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const {validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');


const usersController={
    
  registerProcess:(req,res)=>{
    const errores=validationResult(req)
    console.log(errores)
    if(errores.length > 0){
        res.render('user-register',{errors:errores.mapped(),old:req.body})
        }
  },
      
  usersCreate: (req, res) => {
    let hash=bcrypt.hashSync('req.body.password',10);
    
        let newUser = {
          id: null,
          name: null,
          lastName:null,
          dni:null,
          gender:null,
          birthDay:null,
          password:null,
          contactNumber:null,
          email:null,
          profilePhoto:null,
          userClass:null,          
        };
       
          (newUser.name = req.body.nombre),
          (newUser.lastName=req.body.apellido),
          (newUser.dni = req.body.dni),
          (newUser.gender = req.body.sexo),
          (newUser.birthDay = req.body.fechaNac),
          (newUser.password = hash),
          (newUser.contactNumber = req.body.tel),
          (newUser.email=req.body.email),
          (newUser.userClass=req.body.userClass),
          (newUser.profilePhoto=req.file),
          (newUser.id = users.length + 1);
       
         if(req.files){
          req.files.forEach(imagen => {
              newUser[imagen.fieldname]=imagen.filename
          });
          
        };
    
             
        
    
        users.push(newUser);
        let newData = JSON.stringify(users,null,' ');
        fs.writeFileSync(usersFilePath, newData);
        res.redirect("/"); 
      },
    
      userEdit: (req, res) => {
        if (req.params.id - 1 < users.length) {
        res.render("user-edit", {
          userToEdit: users[req.params.id -1],
          
      })}},
    
      userUpdate:(req,res)=>{
        console.log(req.body)
        console.log(req.params)
        let userToEdit=users.find(
          (user)=>user.id == req.params.id);
          console.log(userToEdit)
          users.forEach(user=>{if(user.id==req.params.id){
            (user.name = req.body.nombre),
            (user.lastName=req.body.apellido)
            (user.gender = req.body.sexo),
            (user.birthDay = req.body.fechaNac),
            (user.password = hash),
            (user.contactNumber = req.body.tel),
            (user.email=req.body.email),
            (user.userClass=req.body.userClass),
            (user.profilePhoto=req.file)
          }})
          let newData= JSON.stringify(users);
          fs.writeFileSync(usersFilePath, newData);
          res.redirect("/")
    
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
      login:(req,res)=>{
        res.render('user-login')
       },
  
      register :(req,res)=>{
        
         res.render('user-register')
      },

    };

module.exports=usersController;