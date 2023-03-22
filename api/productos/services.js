const modelProductos = require("./model");

/* El servicio contiene la logica de la api recibe los datos del controlador 
y los manipula enviando y recibiendo los datos desde el model y dando respuesta al controlador*/

async function obtenerProductos() {
  try {
    let productos = await modelProductos.buscarTodos();
    return productos;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los productos');
  }
};

module.exports.obtenerProductos=obtenerProductos;