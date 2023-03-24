const express = require("express");
const productoService = require("./services");
const controladorProductos = express.Router();

/* Puntos de entrada a la API para la gestión de productos:
Get -> obtener todos los productos.
Get -> Obtener un producto por Id.
Get -> Obtener productos por Categoría.
Get -> Obtener productos por Nombre o descripción.
Post -> Crear un nuevo producto.
Put -> Actualizar un producto existente.
Delete -> Eliminar un producto.*/

/* Al solicitar todos los elementos el req es la petición misma, y el res envía la respuesta obtenida */


controladorProductos.get("/obtenerProductos", async function (req, res) {
  let productos = await productoService.obtenerProductos();
  res.send({
    mensaje: "Listado de Productos",
    data: productos,
  });
});

/*Crea un nuevo elemento al ser Post de debe solicitar los datos por body*/
controladorProductos.post("/crearProducto", async function (req, res) {
let datos = req.body;
let producto = await productoService.crearProducto(datos);
res.send({
mensaje: producto.mensaje,
datos: producto.datos,
});
});

/*Actualiza un elemento por id*/
controladorProductos.put("/actualizarProducto/:id", async function (req, res) {
let id = req.params.id;
let datos = req.body;
let resultado = await productoService.actualizarProducto(id, datos);
res.send(resultado);
});



module.exports = controladorProductos;


 //Exporta el objeto Router del controlador de productos.