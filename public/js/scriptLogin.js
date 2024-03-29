window.addEventListener('load', function() {

    let formulario = document.querySelector('form.login-form');

    formulario.addEventListener('submit', function(e) {

        let arrayerroresMail = [];
        let arrayerroresPassword = [];

        // Variables IMPUT del Form

        let campomail = document.querySelector('#email');
        let erroresMail = document.querySelector('div.text-danger.mail');

        let campoPassword = document.querySelector('#password');
        let erroresPassword = document.querySelector('div.text-danger.pass');


        // MAIL
        if (campomail.value.trim() === "") {
            arrayerroresMail.push("El campo de correo electrónico debe estar completo");
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
            if (!emailPattern.test(campomail.value.trim())) {
                arrayerroresMail.push("El correo electrónico ingresado no es válido");
            }
        }
        // errores
        if (arrayerroresMail.length > 0) {
            e.preventDefault();
            erroresMail.innerHTML = ''; // Clear any previous error messages
            for (let i = 0; i < arrayerroresMail.length; i++) {
                erroresMail.innerHTML += "<p>" + arrayerroresMail[i] + "</p>";
            }
        } else {
            erroresMail.innerHTML = ''; // Clear the error message if there are no errors
        }

        // PASSWORD
        if (campoPassword.value === "") {
            arrayerroresPassword.push("El campo de contraseña debe estar completo");
        } else {
            let regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!regex.test(campoPassword.value)) {
            arrayerroresPassword.push("Tu contraseña debe tener por lo menos 8 caracteres, una letra mayúscula y un número");
            }
        }
        // errores
        if (arrayerroresPassword.length > 0) {
            e.preventDefault();
            erroresPassword.innerHTML = ''; // Clear any previous error messages
            for (let i = 0; i < arrayerroresPassword.length; i++) {
                erroresPassword.innerHTML += "<p>" + arrayerroresPassword[i] + "</p>";
            }
        } else {
            erroresPassword.innerHTML = ''; // Clear the error message if there are no errors
        }
        
    });
        // SCRIPT PARA DAR VISIBILIDAD A LA CONTRASEÑA

        const togglePassword = document.querySelector("#togglePassword");
        const password = document.querySelector("#password");

        togglePassword.addEventListener("click", function () {
        // toggle the type attribute
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        
        // toggle the icon
        this.classList.toggle("bi-eye");
    });

});

