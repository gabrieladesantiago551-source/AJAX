function listar() {
  $.ajax({
    method: "GET",
    url: "/productos/api/productos",
    data: {},
    success: function (productos) {
      let tabla = new DataTable('#example1');
      productos.forEach(producto=>{

        let botones = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-update" onclick="identificaActualizar('+producto.id+')"> Editar </button>';
        botones = botones + ' <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-delete" onclick="identificaEliminar('+producto.id+')">Eliminar</button>';

        let rowNode = tabla.row
            .add([producto.id, producto.nombre, '$ '+producto.precio, producto.stock, botones])
            .draw()
            .node().id = 'renglon_' + producto.id;
      })
    }
  });
}

function guardar() {
  //Guarda producto de manera asincrona usando ajax - jQuery
  let nombreProducto = document.getElementById('nombre').value;
  let precioProducto = document.getElementById("precio").value;
  let stockProducto = document.getElementById("stock").value;
  let categoriaProducto = document.getElementById("categoria").value;
  //Solcitud de guardar un producto usando AJAX
  $.ajax({
    method:'POST',
    url: "/productos/api/productos",
    contentType:"application/json",
    //Body - RequestBody
    data: JSON.stringify({
        nombre: nombreProducto,
        precio:precioProducto,
        stock:stockProducto,
        categoria:categoriaProducto
      })
    ,
    success: function (producto) {
      //Es la respuesta del servidor
      //Agregar el producto a la tabla
      let botones = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-update" onclick="identificaActualizar('+producto.id+')"> Editar </button>';
      botones = botones + ' <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-delete" onclick="identificaEliminar('+producto.id+')">Eliminar</button>';

      let tabla = new DataTable("#example1");
      var rowNode = tabla.row
          .add([producto.id,producto.nombre,producto.precio,producto.stock,botones])
          .draw()
          .node().id='renglon_'+producto.id;

      alert("Producto Guardado Correctamente");
      limpiarFormulario();
      //Cerrar la ventana modal
    }
  });
}

function limpiarFormulario(){
  document.getElementById('nombre').value="";
  document.getElementById('precio').value="";
  document.getElementById('stock').value="";
  document.getElementById('nombre').focus();
}

//Dos metodos para actualizar un productos
function identificaActualizar(id) {
  //Mostrar de manera asincrona el producto actualizar
  $.ajax({
    method:'GET',
    url: "/productos/api/productos/"+id,
    data: {},
    success: function( producto ) {
      //Mostralo en el modal de Actualizar
      document.getElementById('id-update').value=producto.id
      document.getElementById('nombre-update').value=producto.nombre;
      document.getElementById('precio-update').value=producto.precio;
      document.getElementById('stock-update').value=producto.stock;
      document.getElementById('categoria-update').value=producto.categoria;
    }
  });
}

function actualizar() {
  //Actualiza el producto identificado
  let idPoducto = document.getElementById('id-update').value;
  let nombreProducto=document.getElementById('nombre-update').value;
  let precioProducto = document.getElementById('precio-update').value;
  let stockProducto =document.getElementById('stock-update').value;
  let catetoriaProducto = document.getElementById('categoria-update').value
  $.ajax({
    method:'PATCH',
    contentType:'application/json',
    url: "/productos/api/productos/"+idPoducto,
    data: JSON.stringify({
      nombre:nombreProducto,
      precio:precioProducto,
      stock:stockProducto,
      categoria:catetoriaProducto
    }),
    success: function( producto ) {
      //Editar el renglon de la tabla
      let tabla = new DataTable("#example1");
      var datos = tabla.row("#renglon_"+idPoducto).data()
      datos[1]=nombreProducto;
      datos[2]=precioProducto;
      datos[3]=stockProducto;
      tabla.row("#renglon_"+idPoducto).data(datos)
      tabla.draw();
      alert('Producto actualizado');
    }
  });
}

//Dos metodos para eliminar
function identificaEliminar(id) {
  //Recueprar los datos del producto del servidor usando AJAX
  $.ajax({
    method:'GET',
    url: "/productos/api/productos/"+id,
    data: {},
    success: function( producto ) {
      //Mostrar en el modal los datos del producto
      document.getElementById('id-eliminar').value=producto.id;
      document.getElementById('nombre-delete').value=producto.nombre;
      document.getElementById('precio-delete').value=producto.precio;
      document.getElementById('stock-delete').value=producto.stock;
      document.getElementById('categoria-delete').value=producto.categoria
    }
  });
}

function eliminar() {
  //Elimina de manera asincrona con ajax usando jQuery
  const idEliminar=document.getElementById('id-eliminar').value;
  $.ajax({
    method:'DELETE',
    url: "/productos/api/productos/"+idEliminar,
    data: {},
    success: function( producto ) {
      alert('Producto Eliminado')
      //Eliminar de la tabla el producto
      //Hay que implementar borrar el renglon
      let tabla = new DataTable('#example1');

      let rows = tabla
          .row('#renglon_'+idEliminar)
          .remove()
          .draw();
    }
  });
}
