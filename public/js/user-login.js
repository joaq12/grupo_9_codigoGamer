window.addEventListener("load", () => {
  const form = document.querySelector(".login-container_form");
  const email = document.querySelector("#email");
  const password = document.getElementById("password");

  email.focus();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
  });

  function checkInputs() {
    const emailValue = email.value.trim();
    const pwValue = password.value.trim();

    if (emailValue === "") {
      setError(email, "El campo no puede estar vacio");
    } else if (!isEmail(emailValue)) {
      setError(email, "El email ingresado es invalido");
    } else {
      setCheck(email);
    }

    if (pwValue === "") {
      setError(password, "El campo no puede estar vacio");
    } else if (pwValue.length < 8) {
      setError(password, "El campo debe tener mas de 8 caracteres");
    } else {
      setCheck(password);
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
});
