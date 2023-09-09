window.addEventListener('load', function() {
    // Campo NOMBRE COMPLETO
    let formulario = document.querySelector('form.register-form');

    formulario.addEventListener('submit', function(e) {

        let arrayerroresNombre = [];
        let arrayerroresMail = [];
        let arrayerroresPassword = [];
        let arrayerroresCheckbox = [];

        // Variables IMPUT del Form
        let camponombre = document.querySelector('#nombreCompleto');
        let erroresNombre = document.querySelector('div.text-danger.nombre');

        let campomail = document.querySelector('#email');
        let erroresMail = document.querySelector('div.text-danger.mail');

        let campoPassword = document.querySelector('#password');
        let erroresPassword = document.querySelector('div.text-danger.pass');

        let campoCheckbox = document.querySelector('input[name="checkbox"]');
        let erroresCheckbox = document.querySelector('div.text-danger.check');


        // NOMBRE
        if (camponombre.value.trim() === "") {
            arrayerroresNombre.push("Este campo debe estar completo");
        } else {
            // Check if it contains both a first name and a last name separated by a space
            let nameParts = camponombre.value.trim().split(' ');
            if (nameParts.length < 2) {
                arrayerroresNombre.push("El nombre completo debe contener al menos un nombre y un apellido separados por un espacio");
            }
        }
        // errores
        if (arrayerroresNombre.length > 0) {
            e.preventDefault();
            erroresNombre.innerHTML = ''; // Clear any previous error messages
            for (let i = 0; i < arrayerroresNombre.length; i++) {
                erroresNombre.innerHTML += "<p>" + arrayerroresNombre[i] + "</p>";
            }
        } else {
            erroresNombre.innerHTML = ''; // Clear the error message if there are no errors
        }

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
            let regex = /^(?=.[A-Za-z])(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (!regex.test(campoPassword.value)) {
            arrayerroresPassword.push("Tu contraseña debe tener por lo menos 8 caracteres, entre ellos un número y un carácter especial");
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

        // Checkbox

        if (!campoCheckbox.checked) {
            arrayerroresCheckbox.push("Necesitás aceptar nuestros términos y condiciones");
        } else {
            erroresCheckbox.innerHTML = ''; // Clear the error message if there are no errors
        }
        // errores
        if (arrayerroresCheckbox.length > 0) {
            e.preventDefault();
            erroresCheckbox.innerHTML = ''; // Clear any previous error messages
            for (let i = 0; i < arrayerroresPassword.length; i++) {
                erroresCheckbox.innerHTML += "<p>" + arrayerroresCheckbox[i] + "</p>";
            }
        } else {
            erroresCheckbox.innerHTML = ''; // Clear the error message if there are no errors
        }
        
    });
});

