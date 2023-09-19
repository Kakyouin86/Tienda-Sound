window.addEventListener("load", function () {
  const btnAgregarProducto = document.querySelector("#agregarProducto");

  btnAgregarProducto.addEventListener("click", function () {

    Swal.fire({
      title: 'Agregado &#9835',
      text: "¡Seguí comprando en Tienda Sound!",
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3333FF',
      confirmButtonText: 'OK'
    })

    const nombreProductoAgregado = document.querySelector("#nombreProductoAgregado").innerText;
    const descripcionCortaAgregado = document.querySelector("#descripcionCortaAgregado").innerText;
    const precioProductoAgregado = document.querySelector("#precioProductoAgregado").innerText;
    const cantidad = document.querySelector("#cantidad").value;
    const imgProductoAgregado = document.querySelector("#imgProductoAgregado").src;

    // Obtener el objeto productos
    let productos = JSON.parse(localStorage.getItem("carrito"));

    // Si el objeto productos es nulo, inicializarlo
    if (productos === null) {
      productos = [];
    }

    // Crear el objeto JSON
    const productoAgregado = {
      nombre: nombreProductoAgregado,
      descCorta: descripcionCortaAgregado,
      precio: precioProductoAgregado,
      cantidad: parseInt(cantidad),
      img: imgProductoAgregado,
    };

    let productoNuevo = 1;
    for(let i=0; i<productos.length;i++){
        if(productos[i].nombre == productoAgregado.nombre){
            productoNuevo=0;
            productos[i].cantidad= parseInt(productos[i].cantidad) + parseInt(productoAgregado.cantidad)
        }
    }
    if(productoNuevo==1){
        productos.push(productoAgregado);
    }
    // Almacenar el objeto JSON en local storage
    localStorage.setItem("carrito", JSON.stringify(productos));
    
  });
});
