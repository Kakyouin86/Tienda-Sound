window.addEventListener('load', function() {
    
    // Campo NOMBRE COMPLETO
    let formulario = document.querySelector('form.register-form');

    formulario.addEventListener('submit', function(e){ 
        
        let errores = []

        let camponombre = document.querySelector('#nombreCompleto');

        if(camponombre.value == "") {
            errores.push("Este campo debe estar completo")
        }

        if (errores.length > 0) {

            e.preventDefault();

            let ulErrores = document.querySelector('div.text-danger' );

            for (let i = 0; i<errores.length; i++ ) {
                ulErrores.innerHTML = "<p>"+ errores[i] +"</p>"
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