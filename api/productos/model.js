const basedatos = require("../../database/connection");

const buscarTodos = () => {
  const db = basedatos.obtenerConexion();
  return db.collection("productos")
    .find({})
    .toArray()
    .then(productos => productos)
    .catch(error => {
      console.error("Error al buscar productos:", error);
      throw new Error({
        message: "No se pudo buscar los productos",
        stack: error.stack
      });
    });
};

module.exports.buscarTodos =  buscarTodos;
