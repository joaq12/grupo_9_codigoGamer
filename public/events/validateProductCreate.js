window.addEventListener('load', function() {
    
   
    inputs = document.querySelectorAll("input")
    let name = document.getElementById("name")
    let nameError = document.querySelector(".nameError")
    let description = document.getElementById("product-description_description")
    let descError = document.querySelector(".descError")
    let photo1 = document.querySelector("#photo1")
    let photo1Error = document.querySelector(".photo1Error")
    let photo2 = document.querySelector("#photo2")
    let photo2Error = document.querySelector(".photo2Error")
    let photo3 = document.querySelector("#photo3")
    let photo3Error = document.querySelector(".photo3Error")
   
        
    let errors = [];
        


    description.addEventListener("blur", ()=>{
        if(description.value.length < 20){
            description.style.border = "solid 2px #c61921"
            descError.innerHTML = "<li>Debe contener al menos 20 caracteres</li>"             
        }else{
            description.style.border = "solid 1px #59359c"
            description.style.outline = "none"
            descError.innerHTML = "" 
        }
    });    
    
    let validarInputFormulario = (e) => {
        switch(e.target.name){
            
            case "name":
                if(name.value == ""){
                    name.style.border = "solid 2px #c61921"
                    nameError.innerHTML += "<li>El nombre es requerido</li>"
                    errors.push(`Error en ${e.target.name}`) 
                }else{
                    name.style.border = "solid 1px #59359c"
                    name.style.outline = "none"
                    nameError.innerText = ""
                    errors.pop(`Error en ${e.target.name}`) 
                    }
 
                if(name.value.length < 5){
                    name.style.border = "solid 2px #c61921"
                    nameError.innerHTML += "<li>Debe contener al menos 5 caractéres</li>"
                    errors.push(`Error en ${e.target.name}`) 
                }else{
                    name.style.border = "solid 1px #59359c"
                    name.style.outline = "none"
                    nameError.innerText = ""
                    errors.pop(`Error en ${e.target.name}`) 
                    }
 
                
                break;
                case "photo1":
                    if(e.target.value == ""){
                        photo1.style.border = "solid 2px #c61921"
                        photo1Error.innerHTML = "<li>Imagen requerida</li>" 
                        errors.push(`Error en ${e.target.name}`) 
                    }else{
                        photo1.style.border = "solid 1px #59359c"
                        photo1Error.innerHTML = ""
                        photo1.style.outline = "none"
                        errors.pop(`Error en ${e.target.name}`) 
                    }
                break;
                case "photo2":
                    if(e.target.value == ""){
                        photo2.style.border = "solid 2px #c61921"
                        photo2Error.innerHTML = "<li>Imagen requerida</li>" 
                        errors.push(`Error en ${e.target.name}`) 
                    }else{
                        photo2.style.border = "solid 1px #59359c"
                        photo2Error.innerHTML = ""
                        photo2.style.outline = "none"
                        errors.pop(`Error en ${e.target.name}`) 
                    }
                break;
                case "photo3":
                    if(e.target.value == ""){
                        photo3.style.border = "solid 2px #c61921"
                        photo3Error.innerHTML = "<li>Imagen requerida</li>" 
                        errors.push(`Error en ${e.target.name}`) 
                    }else{
                        photo3.style.border = "solid 1px #59359c"
                        photo3Error.innerHTML = ""
                        photo3.style.outline = "none"
                        errors.pop(`Error en ${e.target.name}`) 
                    }
                break;
    }}
    
    inputs.forEach((input) => {
        input.addEventListener("blur", validarInputFormulario);


    });
    
    photo1.addEventListener("blur", () =>{
            let acceptedExt = [".gif", ".jpg", ".jpeg", ".png"];            
            let extention = (photo1.value.substring(photo1.value.lastIndexOf("."))).toLowerCase();
            let extFilter = acceptedExt.filter(file => file.includes(extention));
            console.log(extention);
            console.log(extFilter);
            if (extFilter.length == 0) {
                photo1Error.innerHTML = `Extensión de archivo inválida. \n  
                Las extensiones permitidas son ${acceptedExt.join(' - ')}`
                photo1.style.border = "solid 2px #c61921"
                errors.push(`Error en ${photo1.name}`) 
            } else {
                photo1.style.border = "solid 1px #59359c"
                photo1Error.innerHTML = ""
                photo1.style.outline = "none"
                errors.pop(`Error en ${photo1.name}`) 
            };       
    })

         photo2.addEventListener("blur", () => {
         let acceptedExt = [".gif", ".jpg", ".jpeg", ".png"];            
         let extention = (photo2.value.substring(photo2.value.lastIndexOf("."))).toLowerCase();
         let extFilter = acceptedExt.filter(file => file.includes(extention));
         console.log(extention);
         console.log(extFilter);
         if (extFilter.length > 0) {
             photo2.style.border = "solid 1px #59359c"
             photo2Error.innerHTML = ""
             photo2.style.outline = "none"
             errors.pop(`Error en ${photo2.name}`) 
         } else {
             photo2Error.innerHTML = `Extensión de archivo inválida. \n  
             Las extensiones permitidas son ${acceptedExt.join(' - ')}`
             photo2.style.border = "solid 2px #c61921"
             errors.push(`Error en ${photo2.name}`) 
         }
            })
        
            photo3.addEventListener("blur", () => {
                let acceptedExt = [".gif", ".jpg", ".jpeg", ".png"];            
                let extention = (photo3.value.substring(photo3.value.lastIndexOf("."))).toLowerCase();
                let extFilter = acceptedExt.filter(file => file.includes(extention));
                console.log(extention);
                console.log(extFilter);
                if (extFilter.length > 0) {
                    photo3.style.border = "solid 1px #59359c"
                    photo3Error.innerHTML = ""
                    photo3.style.outline = "none"
                    errors.pop(`Error en ${photo3.name}`) 
                } else {
                    photo3Error.innerHTML = `Extensión de archivo inválida. \n  
                    Las extensiones permitidas son ${acceptedExt.join(' - ')}`
                    photo3.style.border = "solid 2px #c61921"
                    errors.push(`Error en ${photo3.name}`) 
                }
            })
      
    
    document.addEventListener("submit", function(e){
        if(errors.length >0){
            for (let i = 0; i < errors.length; i++) {   
                e.preventDefault();
                console.log(errors[i]);
            }
        }
    })
});


      
    
    document.addEventListener("submit", function(e){
        if(errors.length >0){
            for (let i = 0; i < errors.length; i++) {   
                e.preventDefault();
                console.log(errors[i]);
            }
        }
    })
