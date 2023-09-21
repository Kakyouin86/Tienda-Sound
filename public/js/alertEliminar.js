window.addEventListener("load", function () {

    const btnEliminarProducto = document.querySelector("form.eliminarProducto");
  
    btnEliminarProducto.addEventListener("submit", function (e) {
        e.preventDefault()
        
        Swal.fire({
            title: 'Eliminar',
            text: "¿Estás seguro/a de eliminar el producto?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E93882',
            cancelButtonColor: '#3333FF',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
                btnEliminarProducto.submit()
                Swal.fire({
                    title: 'Eliminado',
                    text: "Tu producto ha sido borrado.",
                    icon: 'success',
                    showConfirmButton: false
                  })
            }
          })
    })
})