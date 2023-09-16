window.addEventListener("load", function () {
  const btnAgregarProducto = document.querySelector("#agregarProducto");

  btnAgregarProducto.addEventListener("click", function () {
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
      cantidad: cantidad,
      img: imgProductoAgregado,
    };

    // Agregar el producto
    productos.push(productoAgregado);

    // Almacenar el objeto JSON en local storage
    localStorage.setItem("carrito", JSON.stringify(productos));
    
  });


});
