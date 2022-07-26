window.addEventListener('load', function() {
    
    const expresiones = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }
    inputs = document.querySelectorAll("input")
    let email = document.getElementById("email")
    let emailCont = document.getElementById("email_cont")
    let password = document.getElementById("password")
    let passCont = document.getElementById("pass_cont")
    let emailError = document.querySelector(".emailError")
    let passwordError = document.querySelector(".passwordError")

       
        
    let errors = [];
        
        
      
let validarInputFormulario = (e) => {
    switch(e.target.name){
        case "email":
           if(email.value == ""){
                emailError.innerHTML = "<li>El email es requerido</li>"
                emailCont.style.border = "solid 2px #c61921"   
                errors.push(`Error en ${e.target.name}`) 
            }else{
                emailCont.style.border = "solid 1px #59359c"
                emailCont.style.outline = "none"
                emailError.innerText = ""
                errors.pop(`Error en ${e.target.name}`)             
            }
        if(expresiones.email.test(email.value)){
                emailCont.style.border = "solid 1px #59359c"
                emailCont.style.outline = "none"
                emailError.innerText = ""
            }else{
                emailError.innerHTML += "<li>El email debe tener un formato válido</li>"
                errors.push(`Error en ${e.target.name}`) 
                emailCont.style.border = "solid 2px #c61921"
                errors.pop(`Error en ${e.target.name}`) 
            }
        break;

        case "password":
            if(password.value == ""){
                console.log("error")
                passwordError.innerHTML = "<li>Debe ingresar una contraseña.</li>"
                errors.push(`Error en ${e.target.name}`) 
                passCont.style.border = "solid 2px #c61921"   
                }else{
                    passCont.style.border = "solid 1px #59359c"
                    passCont.style.outline = "none"
                    passwordError.innerText = ""   
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
            
            }}})
      });