window.addEventListener("load", () => {
  console.log("anda");
  const form = document.querySelector(".product-form");
  const nombre = document.querySelector("#name");
  const imagen1 = document.querySelector(".upload-img-button1");
  const imagen2 = document.querySelector(".upload-img-button2");
  const imagen3 = document.querySelector(".upload-img-button3");
  const descripcion = document.querySelector(
    "#product-description_description"
  );

  nombre.focus();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
  });

  function checkInputs() {
    const nombreValor = nombre.value.trim();
    const imagen1Valor = imagen1.value;
    //const imagen2Valor = imagen2.value;
    //const imagen3Valor = imagen3.value;
    const descripcionValor = descripcion.value.trim();

    if (nombreValor === "") {
      setError(nombre, "El campo no puede estar vacio");
    } else if (nombreValor.length < 5) {
      setError(nombre, "El campo debe tener mas de 5 caracteres");
    } else {
      setCheck(nombre);
    }

    if (descripcionValor === "") {
      setError(descripcion, "El campo no puede estar vacio");
    } else if (descripcionValor.length < 20) {
      setError(descripcion, "El campo debe tener mas de 20 caracteres");
    } else {
      setCheck(descripcion);
    }
    if (imagen1Valor === "") {
      setError(imagen1, "Debe ser un archivo válido (JPG, JPEG, PNG, GIF)");
    } else {
      setCheck(imagen1);
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
});
