window.addEventListener('load', function() {
    
    // Campo NOMBRE COMPLETO
    let formulario = document.querySelector('form.register-form');

    formulario.addEventListener('submit', function(e){ 
        let errores = []

        // Campo NOMBRE
        let camponombre = document.querySelector('#nombreCompleto');
        let ulErrores = document.querySelector('div.text-danger' );

        if(camponombre.value == "") {
            errores.push("Este campo debe estar completo")
        } else {
            ulErrores.innerHTML = ''; // Clear the error message if there are no errors
        }
        
        if (camponombre.length < 2) {
            errores.push("El nombre completo debe contener al menos un nombre y un apellido separados por un espacio");
        } else {
            ulErrores.innerHTML = ''; // Clear the error message if there are no errors
        }

        if (errores.length > 0) {
            e.preventDefault();
            for (let i = 0; i<errores.length; i++ ) {
                ulErrores.innerHTML += "<p>"+ errores[i] +"</p>"
            }
        }















        if(nombreCompleto.value.length < 1){
            alert("hola1111111")
            errores.name = 'Este campo debe estar completo'
        }



        if(Object.keys(errores).length >= 1){

            erNombre.innerHTML = (errores.name) ? errores.name : '';

        } else {
            erNombre.innerHTML = ''; // Clear the error message if there are no errors
            registerForm.submit();
        }
    })
})