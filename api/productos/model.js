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

async function buscarPorId(id) {
   let db = basedatos.obtenerConexion();
  try {
    const resultado = await db.collection("productos").findOne({ id: id });
    return resultado;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function buscarPorNombre(nombre) {
   let db = basedatos.obtenerConexion();
  try {
    const resultado = await db.collection("productos").findOne({ nombre: nombre });
    return resultado;
  } catch (error) {
    console.error(error);
    return null;
  }
}


function crearUno(datos) {
  let db = basedatos.obtenerConexion();
  return db
    .collection("productos")
    .insertOne(datos)
    .then(function (resConsulta) {
      return resConsulta;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function actualizarUno(id, datos) {
  const db = basedatos.obtenerConexion();
  try {
    const resultado = await db.collection("productos").updateOne({ _id: objectId(id) }, { $set: datos });
    console.log(resultado);
    return resultado;
  } catch (error) {
    console.log(error);
    return null;
  }
}


module.exports.buscarTodos =  buscarTodos;
module.exports.crearUno=crearUno;
module.exports.actualizarUno= actualizarUno;
module.exports.buscarPorNombre=buscarPorNombre;
module.exports.buscarPorId=buscarPorId;