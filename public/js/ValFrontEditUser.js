window.addEventListener('load', () => {
    let formularioEditarUsuario = document.querySelector('form.profile-form');

    formularioEditarUsuario.addEventListener('submit', e => {
        let erNombreUsuario = [];
        let erEmail = [];
        let erContrasena = [];
        let erFotoAvatar = [];

        // Inputs del form
        let campoNombreUsuario = document.querySelector('#nombreCompleto');
        let erroresCampoNombreUsuario = document.querySelector('div.text-danger.nombreCompleto');

        let campoEmail = document.querySelector('#email');
        let erroresCampoEmail = document.querySelector('div.text-danger.email');

        let campoPassword = document.querySelector('#password');
        let erroresCampoPassword = document.querySelector('div.text-danger.password');

        let campoFotoAvatar = document.querySelector('#imgAvatar');
        let erroresCampoFotoAvatar = document.querySelector('div.text-danger.imgAvatar');

        // Validación nombre
        if(campoNombreUsuario.value.trim() === "") {
            erNombreUsuario.push("Este campo debe estar completo");
        } else {
            // Check if it contains both a first name and a last name separated by a space
            let nameParts = campoNombreUsuario.value.trim().split(' ');
            if (nameParts.length < 2) {
                erNombreUsuario.push("El nombre completo debe contener al menos un nombre y un apellido separados por un espacio");
            }
        } 

        if (erNombreUsuario.length > 0) {
            e.preventDefault();
            erroresCampoNombreUsuario.innerHTML = ''; // Clear any previous error messages
            erroresCampoNombreUsuario.innerHTML += "<p>" + erNombreUsuario + "</p>";
            
        } else {
            erroresCampoNombreUsuario.innerHTML = ''; // Clear the error message if there are no errors
        }

        if(campoEmail.value.trim() === "") {
            erEmail.push("Este campo debe estar completo");
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
            if (!emailPattern.test(campoEmail.value.trim())) {
                erEmail.push("El correo electrónico ingresado no es válido");
            }
        }

        if (erEmail.length > 0) {
            e.preventDefault();
            erroresCampoEmail.innerHTML = '';
            erroresCampoEmail.innerHTML += "<p>" + erEmail + "</p>";
        } else {
            erroresCampoEmail.innerHTML = '';
        }

        // Validaciones password
        if (campoPassword.value.trim() === "") {
            erContrasena.push("Este campo debe estar completo");
        } else {
            let regex = /^(?=.*[0-9]).{8,}$/;
            if (!regex.test(campoPassword.value)) {
            erContrasena.push("Tu contraseña debe tener por lo menos 8 caracteres, entre ellos una mayúscula, número y un carácter especial");
            }
        }

        if (erContrasena.length > 0) {
            e.preventDefault();
            erroresCampoPassword.innerHTML = ''; // Clear any previous error messages
            erroresCampoPassword.innerHTML += "<p>" + erContrasena + "</p>";
            
        } else {
            erroresCampoPassword.innerHTML = ''; // Clear the error message if there are no errors
        }

        // Validación imagen

        var filePath = campoFotoAvatar.value;
        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i; // Extensiones válidas de imágenes.

        if( (!allowedExtensions.exec(filePath)) && (filePath != 0) ) { // Si la imágen no tiene las extenciones válidas y el valor es distinta de  "cero" (si es "cero" sube una imagen por defecto)
            erFotoAvatar.push('Tenés que subir una imagen con formato .jpg, .jpeg, .png, .gif');
        }
        // errores
        if (erFotoAvatar.length > 0) {
            e.preventDefault();
            erroresCampoFotoAvatar.innerHTML = '';
            erroresCampoFotoAvatar.innerHTML += "<p>" + erFotoAvatar + "</p>"
        } else {
            erroresCampoFotoAvatar.innerHTML = '';
        }
    });

        const togglePassword = document.querySelector("#togglePassword");
        const password = document.querySelector("#password");

        togglePassword.addEventListener("click", function () {
        // toggle the type attribute
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        
        // toggle the icon
        this.classList.toggle("bi-eye");
    });

})