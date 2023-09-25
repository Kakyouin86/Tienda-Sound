window.addEventListener("load", function () {

    const btnEliminarUsuario = document.querySelector("form.eliminarUsuario");
  
    btnEliminarUsuario.addEventListener("submit", function (e) {
        
        e.preventDefault()

        Swal.fire({
            title: 'Eliminar cuenta',
            text: "¿Estás seguro/a de eliminar tu cuenta?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E93882',
            cancelButtonColor: '#3333FF',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
                btnEliminarUsuario.submit()
                Swal.fire({
                    title: 'Tu cuenta ha sido eliminada.',
                    text: " ",
                    icon: 'success',
                    showConfirmButton: false
                  })
            }
          })
    })
})