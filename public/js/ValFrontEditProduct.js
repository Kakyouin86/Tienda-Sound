window.addEventListener('load', function() {

    let formularioEditarProducto = document.querySelector('form.crearProducto-form');

    formularioEditarProducto.addEventListener('submit', function(e) {

        let erNombreProducto = [];
        let erDescCorta = [];
        let erPrecioProducto = [];
        let erPrecioEnvio = [];
        let erDescLarga = [];
        let erFotoDestacada = [];

        // Variables IMPUT del Form
        let campoNombreProducto = document.querySelector('#nombreProducto');
        let erroresNombreProducto = document.querySelector('div.text-danger.nombreProducto');

        let campoDescripcionCorta = document.querySelector('#descripcionProductoCorta');
        let erroresDescripcionCorta = document.querySelector('div.text-danger.descripcionCorta');

        let campoPrecioProducto = document.querySelector('#precioProducto');
        let erroresPrecioProducto = document.querySelector('div.text-danger.precioProducto');

        let campoPrecioEnvio = document.querySelector('#precioEnvio');
        let erroresPrecioEnvio = document.querySelector('div.text-danger.precioEnvio');

        let campoDescripcionLarga = document.querySelector('#descripcionProductoLarga');
        let erroresDescripcionLarga = document.querySelector('div.text-danger.descripcionLarga');

        let campoFotoDestacada = document.getElementById('fotoDestacada');
        let erroresFotoDestacada = document.querySelector('div.text-danger.fotoDestacada');


        // Nombre Producto

        if (campoNombreProducto.value.trim() === "") {
            erNombreProducto.push("Este campo debe estar completo");
        }
        // errores
        if (erNombreProducto.length > 0) {
            e.preventDefault();
            erroresNombreProducto.innerHTML = ''; // Clear any previous error messages
            erroresNombreProducto.innerHTML += "<p>" + erNombreProducto[0] + "</p>";
            
        } else {
            erroresNombreProducto.innerHTML = ''; // Clear the error message if there are no errors
        }


        // Descripcion Corta
        
        if (campoDescripcionCorta.value.length == 0) {
            erDescCorta.push("Este campo debe estar completo");
        }
        // errores
        if (erDescCorta.length > 0) {
            e.preventDefault();
            erroresDescripcionCorta.innerHTML = ''; // Clear any previous error messages
            erroresDescripcionCorta.innerHTML += "<p>" + erDescCorta + "</p>";
            
        } else {
            erroresDescripcionCorta.innerHTML = ''; // Clear the error message if there are no errors
        }


        // Precio producto

        if (campoPrecioProducto.value == 0) {
            erPrecioProducto.push("Este campo debe estar completo");
        }else if(campoPrecioProducto.value<=0){
            erPrecioProducto.push("El precio debe ser mayor a 0");
        }
        const precioProducto = Number(campoPrecioProducto.value);    
        if (isNaN(precioProducto)) {
          erPrecioProducto.push("El precio de producto debe ser un número");
        }
        // errores
        if (erPrecioProducto.length > 0) {
            e.preventDefault();
            erroresPrecioProducto.innerHTML = ''; // Clear any previous error messages
            for (let i = 0; i < erPrecioProducto.length; i++) {
                erroresPrecioProducto.innerHTML += "<p>" + erPrecioProducto[i] + "</p>";
            }
            
        } else {
            erroresPrecioProducto.innerHTML = ''; // Clear the error message if there are no errors
        }


         // Precio envio

        //  if (campoPrecioEnvio.value.trim() === "") {
        //     erPrecioEnvio.push("Este campo debe estar completo");
        // }
        const precioEnvio = Number(campoPrecioEnvio.value);    
        if (isNaN(precioEnvio)) {
          erPrecioEnvio.push("El precio de envío debe ser un número");
        }
        // errores
        if (erPrecioEnvio.length > 0) {
            e.preventDefault();
            erroresPrecioEnvio.innerHTML = ''; // Clear any previous error messages
            for (let i = 0; i < erPrecioEnvio.length; i++) {
                erroresPrecioEnvio.innerHTML += "<p>" + erPrecioEnvio[i] + "</p>";
            }
            
        } else {
            erroresPrecioEnvio.innerHTML = ''; // Clear the error message if there are no errors
        }


        // Descripcion Larga
        
        if (campoDescripcionLarga.value.length == 0) {
            erDescLarga.push("Este campo debe estar completo");
        }
        // errores
        if (erDescLarga.length > 0) {
            e.preventDefault();
            erroresDescripcionLarga.innerHTML = ''; // Clear any previous error messages
            erroresDescripcionLarga.innerHTML += "<p>" + erDescLarga + "</p>";
            
        } else {
            erroresDescripcionLarga.innerHTML = ''; // Clear the error message if there are no errors
        }

        // Validación imagen

        var filePath = campoFotoDestacada.value;
        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i; // Extensiones válidas de imágenes.

        if( (!allowedExtensions.exec(filePath)) && (filePath != 0) ) { // Si la imágen no tiene las extenciones válidas y el valor es distinta de  "cero" (si es "cero" sube una imagen por defecto)
            erFotoDestacada.push('Tenés que subir una imagen con formato .jpg, .jpeg, .png, .gif');
        }
        // errores
        if (erFotoDestacada.length > 0) {
            e.preventDefault();
            erroresFotoDestacada.innerHTML = '';
            erroresFotoDestacada.innerHTML += "<p>" + erFotoDestacada + "</p>"
        } else {
            erroresFotoDestacada.innerHTML = '';
        }

        if (erNombreProducto.length === 0 && erDescCorta.length === 0 && erFotoDestacada.length === 0 &&
            erPrecioProducto.length === 0 && erPrecioEnvio.length === 0 && erDescLarga.length === 0) {
        
            Swal.fire({
                title: 'Producto Editado',
                text: "¡Tu producto ha sido editado con éxito!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3333FF',
                confirmButtonText: 'OK'
            });
        }
    });
});

