window.addEventListener("load", () => {
  //console.log("anda");
  const formulario = document.querySelector(".formulario");
  const nombre = document.querySelector("#nombre");
  const apellido = document.querySelector("#apellido");
  const dni = document.querySelector("#dni");
  const fechaNac = document.querySelector("#fechaNac");
  const tel = document.querySelector("#tel");
  const profilePhoto = document.querySelector("#profilePhoto");
  const email = document.querySelector("#email1");
  const email2 = document.querySelector("#email2");
  const password = document.querySelector("#password1");
  const password2 = document.querySelector("#password2");

  nombre.focus();

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
  });

  function checkInputs() {
    const nombreValue = nombre.value.trim();
    const apellidoValue = apellido.value.trim();
    const dniValue = dni.value.trim();
    const fechaNacValue = fechaNac.value.trim();
    const telValue = tel.value.trim();
    const profilePhotoValue = profilePhoto.value.trim();
    const emailValue = email.value.trim();
    const email2Value = email2.value.trim();
    const pwValue = password.value.trim();
    const pw2Value = password2.value.trim();

    if (nombreValue === "") {
      setError(nombre, "El campo no puede estar vacio");
    } else if (nombreValue.length < 3) {
      setError(nombre, "El campo debe tener mas de 2 caracteres");
    } else {
      setCheck(nombre);
    }

    if (apellidoValue === "") {
      setError(apellido, "El campo no puede estar vacio");
    } else if (apellidoValue.length < 3) {
      setError(apellido, "El campo debe tener mas de 2 caracteres");
    } else {
      setCheck(apellido);
    }
    if (dniValue === "") {
      setError(dni, "El campo no puede estar vacio");
    } else {
      setCheck(dni);
    }
    if (fechaNacValue === "") {
      setError(fechaNac, "Debes ingresar una fecha");
    } else {
      setCheck(fechaNac);
    }

    if (telValue === "") {
      setError(tel, "El campo no puede estar vacio");
    } else {
      setCheck(tel);
    }

    if (profilePhotoValue === "") {
      setError(
        profilePhoto,
        "Debe ser un archivo válido (JPG, JPEG, PNG, GIF)"
      );
    } else {
      setCheck(profilePhoto);
    }

    if (emailValue === "") {
      setError(email, "El campo no puede estar vacio");
    } else if (!isEmail(emailValue)) {
      setError(email, "El email ingresado es invalido");
    } else {
      setCheck(email);
    }

    if (email2Value === "") {
      setError(email2, "El campo no puede estar vacio");
    } else if (emailValue !== email2Value) {
      setError(email2, "Los correos no coinciden");
    } else {
      setCheck(email2);
    }

    if (pwValue === "") {
      setError(password, "El campo no puede estar vacio");
    } else if (pwValue.length < 8) {
      setError(password, "El campo debe tener mas de 8 caracteres");
    } else {
      setCheck(password);
    }

    if (pw2Value === "") {
      setError(password2, "El campo no puede estar vacio");
    } else if (pw2Value.length < 8) {
      setError(password2, "El campo debe tener mas de 8 caracteres");
    } else if (pwValue !== pw2Value) {
      setError(password2, "Las contraseñas no coinciden");
    } else {
      setCheck(password2);
    }
  }

  function setError(input, texto) {
    const formControl = input.parentElement;
    const small = formControl.querySelector(".msj-error");
    small.innerText = texto;
    formControl.className = "form-control error";
  }
  function setCheck(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control check";
  }

  function isEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  }

  // let validObj = {
  //   nombre: "",
  //   apellido: "",
  //   dni: "",
  //   fechaNac: "",
  //   tel: "",
  //   profilePhoto: "",
  //   email: "",
  //   email2: "",
  //   password: "",
  //   password2: "",
  // };

  // for (let i = 0; validacion.length > i; i++) {
  //   if (validacion[i].value == "") {
  //     validObj[
  //       validacion[i].name
  //     ] = `El campo ${validacion[i].name} debe estar completo`;

  //     validacion[i].classList.add("is-invalid");
  //     validacion[i].classList.remove("is-valid");
  //   } else {
  //     validacion[i].classList.remove("is-invalid");
  //     validacion[i].classList.add("is-valid");
  //   }
  // }
  // let ulErrores = document.querySelectorAll(".error");
  // let arrErrors = Object.keys(validObj);
  // arrErrors.forEach((error, i) => {
  //   if (ulErrores[i].classList.contains(error))
  //     ulErrores[i].textContent += `${validObj[error]}`;
  // });
});
