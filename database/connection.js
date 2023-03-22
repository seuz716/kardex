const mongoClient = require("mongodb").MongoClient;

// Configuración de variables de entorno
const MONGODB_URI = "mongodb+srv://cesar:cesar@cluster0.wtlfm.mongodb.net/?retryWrites=true&w=majority";
const MONGODB_DB = "productos";

let conexion;

// Función para conectarse a la base de datos
const conectar = function () {
  return new Promise(function (resolve, reject) {
    if (conexion) {
      resolve();
    } else {
      mongoClient.connect(MONGODB_URI, { useNewUrlParser: true })
      .then(function (client) {
        conexion = client.db(MONGODB_DB);
        console.log("base de datos conectada exitosamente");
        resolve();
      })
      .catch(function (error) {
        reject(error);
      } )
    }
  });
}

// Función para obtener la conexión a la base de datos
const obtenerConexion = function () {
    return conexion;
}

module.exports = {conectar,obtenerConexion};
