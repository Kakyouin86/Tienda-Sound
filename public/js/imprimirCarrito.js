window.addEventListener("load", function () {
  let productos = JSON.parse(localStorage.getItem("carrito"));

  if (productos && productos.length > 0) {
    let listadoProductos = document.querySelector("#listadoProductos");

    for (let i = 0; i < productos.length; i++) {
      // Generar el elemento HTML
      let elementoProducto = document.createElement("article");
      elementoProducto.classList.add("compra1");

      // Agregar la imagen
      let imagen = document.createElement("img");
      imagen.src = productos[i].img;
      imagen.classList.add("foto_p");
      elementoProducto.appendChild(imagen);

      // Contenedor para la información del producto
      let prodContainer = document.createElement("div");
      prodContainer.classList.add("prod");

      // Agregar el nombre
      let nombre = document.createElement("h5");
      nombre.classList.add("tit_prod");
      nombre.textContent = productos[i].nombre;
      elementoProducto.appendChild(nombre);

      // // Agregar la descripción
      // let descripcion = document.createElement("p");
      // descripcion.classList.add("des_pr");
      // descripcion.textContent = productos[i].descCorta;
      // elementoProducto.appendChild(descripcion);

      // Crear el elemento HTML para la cantidad con botones de aumento y disminución
      let cantidadContainer = document.createElement("div");
      cantidadContainer.classList.add("cantidad");

      // Agregar el botón de disminución
      let botonDisminuir = document.createElement("img");
      botonDisminuir.src = "/img/carrito/minus.svg";
      botonDisminuir.alt = "Disminuir cantidad";
      botonDisminuir.addEventListener("click", () => disminuirCantidad(i)); // Llamar a la función disminuirCantidad con el índice
      cantidadContainer.appendChild(botonDisminuir);

      // Agregar la cantidad actual
      let cantidadActual = document.createElement("p");
      cantidadActual.classList.add("cuantos");
      cantidadActual.textContent = productos[i].cantidad;
      cantidadContainer.appendChild(cantidadActual);

      // Agregar el botón de aumento
      let botonAumentar = document.createElement("img");
      botonAumentar.src = "/img/carrito/plus.svg";
      botonAumentar.alt = "Aumentar cantidad";
      botonAumentar.addEventListener("click", () => aumentarCantidad(i)); // Llamar a la función aumentarCantidad con el índice
      cantidadContainer.appendChild(botonAumentar);

      elementoProducto.appendChild(cantidadContainer);

      // Agregar el precio
      let precioContainer = document.createElement("div");
      precioContainer.classList.add("precio_pr");
      let precio = document.createElement("p");
      precio.textContent = "$ "+`${productos[i].precio}`;
      precio.classList.add("prpr");
      elementoProducto.appendChild(precio);

      // Agregar el botón de eliminar
      let botonEliminar = document.createElement("button");
      botonEliminar.textContent = "ELIMINAR";
      botonEliminar.classList.add("btn-eliminar");
      botonEliminar.addEventListener("click", () => eliminarProducto(i)); // Pasar el índice del producto a eliminar
      elementoProducto.appendChild(botonEliminar);

      // Agregar el último div con clase "border"
      let borderDiv = document.createElement("div");
      borderDiv.classList.add("border");
      elementoProducto.appendChild(borderDiv);

      // Agregar el elemento HTML al DOM
      listadoProductos.appendChild(elementoProducto);
      actualizarCantidadYTotal();

    }
  }

  function eliminarProducto(index) {
    let productos = JSON.parse(localStorage.getItem("carrito"));

    if (productos && productos.length > index) {
      productos.splice(index, 1); // Eliminar el producto en el índice especificado
      localStorage.setItem("carrito", JSON.stringify(productos)); // Actualizar el almacenamiento local
      actualizarCantidadYTotal();
      location.reload(); // Recargar la página para reflejar los cambios

    }
  }

  function disminuirCantidad(index) {
    let productos = JSON.parse(localStorage.getItem("carrito"));

    if (productos && productos.length > index) {
      if (productos[index].cantidad > 1) {
        productos[index].cantidad -= 1;
        localStorage.setItem("carrito", JSON.stringify(productos));
        actualizarCantidadVisual(index, productos[index].cantidad);
      }
    }
  }

  function aumentarCantidad(index) {
    let productos = JSON.parse(localStorage.getItem("carrito"));

    if (productos && productos.length > index) {
      productos[index].cantidad += 1;
      localStorage.setItem("carrito", JSON.stringify(productos));
      actualizarCantidadVisual(index, productos[index].cantidad);
    }
  }

  function actualizarCantidadVisual(index, nuevaCantidad) {
    // Actualizar la cantidad visual en la vista
    let cantidadElement = document.querySelector(
      `#listadoProductos article:nth-child(${index + 1}) .cuantos`
    );
    cantidadElement.textContent = nuevaCantidad;
    
  }


  // Para borrar todo
  let btnBorrarTodo = document.querySelector("#borrarTodo");
  btnBorrarTodo.addEventListener("click", function (e) {
    // Elimina todos los productos del carrito
    localStorage.removeItem("carrito");
    actualizarCantidadYTotal();
    // Recarga la página para reflejar los cambios (opcional)
    location.reload();
  });

  // Calcula la cantidad de ítems en el carrito
  function calcularCantidadItems() {
    let productos = JSON.parse(localStorage.getItem("carrito"));
    let cantidadTotal = 0;

    if (productos && productos.length > 0) {
      for (let i = 0; i < productos.length; i++) {
        cantidadTotal += productos[i].cantidad;
      }
    }

    return cantidadTotal;
  }

  // Calcula el precio total en el carrito
  function calcularPrecioTotal() {
    let productos = JSON.parse(localStorage.getItem("carrito"));
    let precioTotal = 0;

    if (productos && productos.length > 0) {
      for (let i = 0; i < productos.length; i++) {
        precioTotal += productos[i].precio * productos[i].cantidad;
      }
    }
    console.log("Precio Total:", precioTotal);
    return precioTotal;
  }

  // Actualiza la cantidad de ítems y el precio total en el HTML
  function actualizarCantidadYTotal() {
    let cantidadItems = document.getElementById("cantidadItems");
    let totalPrecio = document.getElementById("precio_total");

    cantidadItems.textContent = calcularCantidadItems();
    totalPrecio.textContent = "$ " + calcularPrecioTotal().toFixed(2); // Asegúrate de mostrar el precio con dos decimales
  }

  // Llama a esta función para actualizar la cantidad y el precio total inicialmente
  actualizarCantidadYTotal();

});
