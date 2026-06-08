//CRUD DE UNA SOLA PAGINA USANDO AJAX CON JQUERY
//SIN OLVIDARNOS QUE CON FETCH PODEMOS USAR AJAX DE MANERA NATIVA

//Metodos para el CRUD
function listar() {
  //Cuando veamos $ significa que usamos jQuery
  $.ajax({
    method: "GET",
    url: "/api/getWeather",
    data: {},
    success: function (listado_productos) {
      //Generalmente lo mostramos en el HTML - En la Datatable
      $("#weather-temp").html("<strong>" + result + "</strong> degrees");
    }
  });
  //De forma asincrona listar los productos - ajax - jQuery
}

function guardar() {
  //Guarda producto de manera asincrona usando ajax - jQuery
  let nombreProducto = document.getElementById('nombre').value;
  $.ajax({
    method:'POST',
    url: "/api/getWeather",
    data: {
      nombre: nombreProducto,
      precio:1,
      stock:20,
      categoaria:1
    },
    success: function (result) {
      $("#weather-temp").html("<strong>" + result + "</strong> degrees");
    }
  });
}

//Dos metodos para actualizar un productos
function identificaActualizar() {
  //Mostrar de manera asincrona el producto actualizar
}

function actualizar() {
  //Actualiza el producto identificado
}

//Dos metodos para eliminar
function identificaEliminar() {
  //Muestra los datos del producto de manera asincrona
}

function eliminar() {
  //Elimina de manera asincrona con ajax usando jQuery
}
