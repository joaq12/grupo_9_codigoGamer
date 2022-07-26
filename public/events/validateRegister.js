 
 window.addEventListener('load', function() {
    

const expresiones = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    mayus:/[A-Z]/,
    minus: /[a-z]/,
    scar: /=*[^a-zA-Z0-9]/,
}

inputs = document.querySelectorAll("input")
selects = document.querySelectorAll("select")
    
let name = document.getElementById("nombre")
let lastName = document.getElementById("apellido")
let dni = document.getElementById("dni")
let bDate = document.getElementById("fechaNac")
let phone = document.getElementById("tel")
let gender = document.getElementById("sexo")
let avatar = document.getElementById("profilePhoto")
let email1 = document.getElementById("email1")
let email2 = document.getElementById("email2")
let password1 = document.getElementById("password1")
let password2 = document.getElementById("password2")
let nameError = document.querySelector(".nameError")
let email1Error = document.querySelector(".email1Error")
let email2Error = document.querySelector(".email2Error")
let lastNameError = document.querySelector(".lastNameError")
let dniError = document.querySelector(".dniError")
let bDateError = document.querySelector(".bDateError")
let phoneError = document.querySelector(".phoneError")
let password1Error = document.querySelector(".password1Error")
let password2Error = document.querySelector(".password2Error")
let genderError = document.querySelector(".genderError")
let avatarError = document.querySelector(".avatarError")
let inputCheck = document.querySelectorAll("#fomr-ckeched")
   
    
    let errors = [];
    
    
    gender.addEventListener("blur", ()=>{
        if(gender.value == ""){
            gender.style.border = "solid 2px #c61921"
            genderError.innerHTML += "<li>El Sexo es requerido</li>"             
        }else{
            gender.style.border = "solid 1px #59359c"
            gender.style.outline = "none"
            genderError.innerHTML = "" 
        }
    });
    
  
    let validarInputFormulario = (e) => {
        switch(e.target.name){
            
            case "nombre":
                if(name.value == ""){
                    name.style.border = "solid 2px #c61921"
                    nameError.innerHTML = "<li>El Nombre es requerido</li>"
                    errors.push(`Error en ${e.target.name}`) 
                }else{
                    name.style.border = "solid 1px #59359c"
                    name.style.outline = "none"
                    nameError.innerHTML = ""
                    errors.pop(`Error en ${e.target.name}`) 
                };
                if(name.value.length < 2){
                    name.style.border = "solid 2px #c61921"
                    nameError.innerHTML += "<li>Debe contener al menos 2 caractéres</li>"
                    errors.push(`Error en ${e.target.name}`) 
                }else{
                    name.style.border = "solid 1px #59359c"
                    name.style.outline = "none"
                    nameError.innerText = ""
                    errors.pop(`Error en ${e.target.name}`) 
                    }
                break;

            case "apellido":
                if(lastName.value == ""){
                    lastName.style.border = "solid 2px #c61921"
                    lastNameError.innerHTML = "<li>El Apellido es requerido</li>" 
                    errors.push(`Error en ${e.target.name}`) 
                }else{
                    
                    lastName.style.border = "solid 1px #59359c"
                    lastName.style.outline = "none"
                    lastNameError.innerText = ""
                    errors.pop(`Error en ${e.target.name}`) 

                };
                if(lastName.value.length < 2){
                    lastName.style.border = "solid 2px #c61921"
                    lastNameError.innerHTML += "<li>El Apellido debe contener al menos 2 caractéres</li>"
                    errors.push(`Error en ${e.target.name}`) 
                }else{

                 lastName.style.border = "solid 1px #59359c"
                 lastName.style.outline = "none"
                 lastNameError.innerText = ""
                 errors.pop(`Error en ${e.target.name}`) 
                }
                break;

            case "dni":
                if(dni.value == ""){
                    dni.style.border = "solid 2px #c61921"
                    dniError.innerHTML = "<li>El DNI es requerido</li>"    
                    errors.push(`Error en ${e.target.name}`)  
                }else{
                    dni.style.border = "solid 1px #59359c"
                    dni.style.outline = "none"
                    dniError.innerText = "" 
                    errors.pop(`Error en ${e.target.name}`) 
                };
            break;
           
            case "fechaNac":
                if(bDate.value == ""){
                    bDate.style.border = "solid 2px #c61921"
                    bDateError.innerHTML = "<li>La fecha de nacimiento es requerida</li>" 
                    errors.push(`Error en ${e.target.name}`) 
                }else{
                    bDate.style.border = "solid 1px #59359c"
                    bDate.style.outline = "none"
                    bDateError.innerText = ""
                    errors.pop(`Error en ${e.target.name}`) 
                    inputCheck.style.display = "block"
                };
            break;

            case "tel":
                if(phone.value == ""){
                    phone.style.border = "solid 2px #c61921"
                    phoneError.innerHTML = "<li>El teléfono es requerido</li>" 
                    errors.push(`Error en ${e.target.name}`) 
                }else{
                    phone.style.border = "solid 1px #59359c"
                    phone.style.outline = "none"
                    phoneError.innerText = ""
                    errors.pop(`Error en ${e.target.name}`) 
                };
            break;

            case "profilePhoto":
            acceptedExt = [".gif", ".jpg", ".jpeg", ".png"];            
            extention = (e.target.value.substring(e.target.value.lastIndexOf("."))).toLowerCase();
            let extFilter = acceptedExt.filter(file => file.includes(extention));
            if (extFilter.length > 0) {
                avatar.style.border = "solid 1px #59359c"
                avatarError.innerHTML = ""
                avatar.style.outline = "none"
                errors.pop(`Error en ${e.target.name}`) 
            } else {
                avatarError.innerHTML = `Extensión de archivo inválida. \n  
                Las extensiones permitidas son ${acceptedExt.join(' - ')}`
                avatar.style.border = "solid 2px #c61921"
                errors.push(`Error en ${e.target.name}`) 
            }
            if(e.target.value == ""){
                avatar.style.border = "solid 2px #c61921"
                avatarError.innerHTML = "<li>Imagen requerida</li>" 
                errors.push(`Error en ${e.target.name}`) 
            }else{
                avatar.style.border = "solid 1px #59359c"
                avatarError.innerHTML = ""
                avatar.style.outline = "none"
                errors.pop(`Error en ${e.target.name}`) 
            }
    
            break;

            case "email1":
               if(email1.value == ""){
                    email1Error.innerHTML = "<li>El email es requerido</li>"
                    email1.style.border = "solid 2px #c61921"   
                    errors.push(`Error en ${e.target.name}`) 
                }else{
                    email1.style.border = "solid 1px #59359c"
                    email1.style.outline = "none"
                    email1Error.innerText = ""
                    errors.pop(`Error en ${e.target.name}`)             
                }
                if(expresiones.email.test(email1.value)){
                    email1.style.border = "solid 1px #59359c"
                    email1.style.outline = "none"
                    email1Error.innerText = ""
                    errors.pop(`Error en ${e.target.name}`)             
                }else{
                    email1Error.innerHTML += "<li>El email debe tener un formato válido</li>"
                    errors.push(`Error en ${e.target.name}`) 
                    email1.style.border = "solid 2px #c61921"
                }
                break;
                
                case "email2":
                    if(email2.value == ""){
                        email2Error.innerHTML = "<li>Debe reingresar el email</li>"
                        errors.push(`Error en ${e.target.name}`) 
                        email2.style.border = "solid 2px #c61921"
                    }else{
                        email2.style.border = "solid 1px #59359c"
                        email2.style.outline = "none"
                        email2Error.innerText = ""
                        errors.pop(`Error en ${e.target.name}`)             
                    }
                    if(expresiones.email.test(email2.value)){
                        email2.style.border = "solid 1px #59359c"
                        email2.style.outline = "none"
                        email2Error.innerText = ""
                        errors.pop(`Error en ${e.target.name}`) 
                    }else{
                        email2Error.innerHTML += "<li>El email debe tener un formato válido</li>"
                        errors.push(`Error en ${e.target.name}`) 
                        email2.style.border = "solid 2px #c61921"
                    }
                    if(email2.value != email1.value){
                        email2Error.innerHTML += "<li>Los emails no coinciden.</li>"
                        errors.push(`Error en ${e.target.name}`) 
                        email2.style.border = "solid 2px #c61921"   
                    }else{
                        errors.pop(`Error en ${e.target.name}`) 
                    }
                    break;
                
                case "password1":
                    if(password1.value == ""){
                        password1Error.innerHTML = "<li>La contraseña es requerida.</li>"
                        errors.push(`Error en ${e.target.name}`) 
                        password1.style.border = "solid 2px #c61921"   
                    }else{
                        password1.style.border = "solid 1px #59359c"
                        password1.style.outline = "none"
                        password1Error.innerText = ""            
                        errors.pop(`Error en ${e.target.name}`) 
                    }
                    if(password1.value.length < 8){
                        password1.style.border = "solid 2px #c61921"
                        password1Error.innerHTML += "<li>Debe contener al menos 8 caractéres</li>"
                        errors.push(`Error en ${e.target.name}`) 
                    }else{
                        password1.style.border = "solid 1px #59359c"
                        password1.style.outline = "none"
                        password1Error.innerText = ""
                        errors.pop(`Error en ${e.target.name}`) 
                    }         
                    
                    if(!(expresiones.mayus.test(e.target.value))){
                        password1Error.innerHTML += "<li>Debe contener al menos una mayúscula.</li>"
                        errors.push(`Error en ${e.target.name}`) 
                        password1.style.border = "solid 2px #c61921"   
                    }else{
                        errors.pop(`Error en ${e.target.name}`) 
                    }
                    if(!(expresiones.minus.test(e.target.value))){
                        password1Error.innerHTML += "<li>Debe contener al menos una minúscula.</li>"
                        errors.push(`Error en ${e.target.name}`) 
                        password1.style.border = "solid 2px #c61921"   
                    }else{
                        errors.pop(`Error en ${e.target.name}`) 
                    }
                    if(!(expresiones.scar.test(e.target.value))){
                        password1Error.innerHTML += "<li>Debe contener al menos un caractér especial.</li>"
                        errors.push(`Error en ${e.target.name}`) 
                        password1.style.border = "solid 2px #c61921"   
                    }else{
                        errors.pop(`Error en ${e.target.name}`) 
                    }
                break;

            case "password2":
                if(password2.value == ""){
                    password2Error.innerHTML = "<li>Debe reingresar la contraseña.</li>"
                    errors.push(`Error en ${e.target.name}`) 
                    password2.style.border = "solid 2px #c61921"   
                    }else{
                        password2.style.border = "solid 1px #59359c"
                        password2.style.outline = "none"
                        password2Error.innerText = ""   
                        errors.pop(`Error en ${e.target.name}`)          
                    }
                if(password2.value != password1.value){
                    password2Error.innerHTML = "<li>Las contraseñas no coinciden.</li>"
                    errors.push(`Error en ${e.target.name}`) 
                    password2.style.border = "solid 2px #c61921"               
                }else{
                    errors.pop(`Error en ${e.target.name}`)
                }
            break;    
        }
    }    

    inputs.forEach((input) => {
        input.addEventListener("blur", validarInputFormulario);
    });
  

    document.addEventListener("submit", function(e){
    if(errors.length >0){
        for (let i = 0; i < errors.length; i++) {   
            e.preventDefault();
            console.log(errors[i]);
        }
        }else{
            alert("El usuario se guardo satisfactoriamente")
            }
        })

  });

  