const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

var users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersController = {
  userDetails: (req, res) => {
    let user = users.find((usuario) => usuario.id == parseInt(req.params.id));
    res.render("user-profile", {
      user: user,
      session:
        req.session.usuarioLogged === undefined
          ? null
          : req.session.usuarioLogged,
    });
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
      id: null,
      name: null,
      lastName: null,
      dni: null,
      gender: null,
      birthDay: null,
      password1: null,
      password2: null,
      contactNumber: null,
      email1: null,
      email2: null,
      profilePhoto: null,
      userClass: null,
    };

    (newUser.name = req.body.nombre),
      (newUser.lastName = req.body.apellido),
      (newUser.dni = req.body.dni),
      (newUser.gender = req.body.sexo),
      (newUser.birthDay = req.body.fechaNac),
      (newUser.password1 = bcrypt.hashSync(req.body.password1, 10)),
      (newUser.password2 = bcrypt.hashSync(req.body.password2, 10)),
      (newUser.contactNumber = req.body.tel),
      (newUser.email1 = req.body.email1),
      (newUser.email2 = req.body.email2),
      (newUser.userClass = req.body.userClass),
      (newUser.id = Date.now()),
      (newUser.profilePhoto =
        req.file != undefined ? req.file.filename : "default.png");

    if (errors.isEmpty()) {
      users.push(newUser);
      let newData = JSON.stringify(users, null, " ");
      fs.writeFileSync(usersFilePath, newData);
      res.redirect("/");
    } else {
      res.render("user-register", { errors: errors.errors, old: req.body });
    }
  },
  login: (req, res) => {
    res.render("user-login");
  },

  loginProcess: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let userList;
      if (users == "") {
        userList = [];
      } else {
        userList = users;
      }
      let userToLogin = null;
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].email1 == req.body.email) {
          if (bcrypt.compareSync(req.body.password, userList[i].password1)) {
            userToLogin = userList[i];
            req.session.usuarioLogged = userToLogin;
            return res.redirect("/");
          } else {
            let passError = [{ msg: "La Contraseña ingresada es incorrecta" }];
            return res.render("user-login", {
              passError: passError,
              old: req.body,
            });
          }
        }
      }
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].email1 !== req.body.email) {
          let error = [
            {
              msg: "Los datos ingresados no coinciden con ninguna cuenta registrada",
            },
          ];
          res.render("user-login", { error: error });
        }
      }

      if (userToLogin) {
      }
    } else {
      return res.render("user-login", { errors: errors.errors, old: req.body });
    }
  },

  logout: (req, res) => {
    req.session.usuarioLogged = undefined;
    return res.redirect("/");
  },

  userDelete: (req, res) => {
    let userToDelete = (user) => {
      if (user.id != req.params.id) {
        return user;
      }
    };
    users = users.filter(userToDelete);
    let newDataBase = JSON.stringify(users);
    fs.writeFileSync(usersFilePath, newDataBase);
    return res.redirect("/");
  },

  userEdit: (req, res) => {
    let user = users.find((usuario) => usuario.id == parseInt(req.params.id));
    return res.render("user-edit", {
      userToEdit: user,
      old: req.body,
      session:
        req.session.usuarioLogged === undefined
          ? null
          : req.session.usuarioLogged,
    });
  },

  userUpdate: (req, res) => {
    const errors = validationResult(req);

    let userToEdit = users.find((user) => user.id == req.params.id);
    //console.log(userToEdit)

    if (errors.isEmpty()) {
      users.forEach((user) => {
        if (user.id == req.params.id) {
          user.name = req.body.nombre;
          user.lastName = req.body.apellido;
          user.gender = req.body.sexo;
          user.birthDay = req.body.fechaNac;
          user.contactNumber = req.body.tel;
          (user.email1 = req.body.email1 =
            req.body.email2 ? req.body.email1 : ""),
            (user.email2 = req.body.email2 =
              req.body.email1 ? req.body.email2 : ""),
            (user.userClass = req.body.userClass);
          user.profilePhoto =
            req.file != undefined ? req.file.filename : user.profilePhoto;
        }
      });
      let newData = JSON.stringify(users);
      fs.writeFileSync(usersFilePath, newData);
      return res.redirect("/");
    } else {
      return res.render("user-edit", {
        errors: errors.errors,
        old: req.body,
        userToEdit,
      });
    }
  },

  register: (req, res) => {
    return res.render("user-register");
  },

  allUsers: (req, res) => {
    return res.render("users", {
      users,
      session:
        req.session.usuarioLogged === undefined
          ? null
          : req.session.usuarioLogged,
    });
  },
};

module.exports = usersController;
