window.addEventListener("load", function () {
  let productos = JSON.parse(localStorage.getItem("carrito"));

  if (productos && productos.length > 0) {
    let listadoProductos = document.querySelector("#listadoProductos");

    for (let i = 0; i < productos.length; i++) {

      // Generar el elemento HTML
      let elementoProducto = document.createElement("article");
      elementoProducto.classList.add("compra1");
      console.log(elementoProducto);

      // Agregar la imagen
      let imagen = document.createElement("img");
      imagen.src = productos[i].img;
      elementoProducto.appendChild(imagen);

      // Agregar el nombre
      let nombre = document.createElement("h5");
      nombre.textContent = productos[i].nombre;
      elementoProducto.appendChild(nombre);

      // Agregar la descripción
      let descripcion = document.createElement("p");
      descripcion.textContent = productos[i].descCorta;
      elementoProducto.appendChild(descripcion);

      // Agregar el precio
      let precio = document.createElement("p");
      precio.textContent = `${productos[i].precio}`;
      elementoProducto.appendChild(precio);

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

      // Agregar el botón de eliminar
      let botonEliminar = document.createElement("a");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.addEventListener("click", () => eliminarProducto(i)); // Pasar el índice del producto a eliminar
      elementoProducto.appendChild(botonEliminar);

      // Agregar el elemento HTML al DOM
      listadoProductos.appendChild(elementoProducto);
    }
  }
});

function eliminarProducto(index) {
  let productos = JSON.parse(localStorage.getItem("carrito"));

  if (productos && productos.length > index) {
    productos.splice(index, 1); // Eliminar el producto en el índice especificado
    localStorage.setItem("carrito", JSON.stringify(productos)); // Actualizar el almacenamiento local
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
  let cantidadElement = document.querySelector(`#listadoProductos article:nth-child(${index + 1}) .cuantos`);
  cantidadElement.textContent = nuevaCantidad;
}
