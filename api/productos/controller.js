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

module.exports = controladorProductos;


 //Exporta el objeto Router del controlador de productos.