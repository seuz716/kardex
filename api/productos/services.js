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

/*Crea un nuevo elemento*/
async function crearProducto(datos) {
  let resultado = {
    mensaje: "",
    datos: {}
  };

  // Verificar si el producto ya existe por ID o por nombre
  const productoPorID = await modelProductos.buscarPorId(datos.id);
  const productoPorNombre = await modelProductos.buscarPorNombre(datos.nombre);

  if (productoPorID || productoPorNombre) {
    resultado.mensaje = "No se puede crear el producto. Ya existe un producto con el mismo ID o nombre.";
    resultado.datos = datos;
    return resultado;
  }

  // Verificar que existan movimientos en el inventario
  if (!datos.inventario || datos.inventario.length === 0) {
    resultado.mensaje = "No se puede crear el producto. El inventario está vacío.";
    resultado.datos = datos;
    return resultado;
  }

  // Verificar que los movimientos del inventario sean válidos
  let stock = 0;
  for (let i = 0; i < datos.inventario.length; i++) {
    const movimiento = datos.inventario[i];
    if (movimiento.tipo === "Ingreso" || movimiento.tipo === "Devolución de Cliente" || movimiento.tipo === "Devolución de Proveedor") {
      stock += movimiento.cantidad;
    } else if (movimiento.tipo === "Venta" || movimiento.tipo === "Obsolescencia" || movimiento.tipo === "Pérdida") {
      stock -= movimiento.cantidad;
      if (stock < 0) {
        resultado.mensaje = "No se puede crear el producto. El inventario es negativo.";
        resultado.datos = datos;
        return resultado;
      }
    } else {
      resultado.mensaje = "No se puede crear el producto. El tipo de movimiento del inventario no es válido.";
      resultado.datos = datos;
      return resultado;
    }
  }

  // Crear el producto
  let resConsulta = await modelProductos.crearUno(datos);
  if (resConsulta && resConsulta.acknowledged) {
    resultado.mensaje = "Registro del producto fue correcto";
    resultado.datos = datos;
  } else {
    resultado.mensaje = "Registro de producto incorrecto";
    resultado.datos = datos;
  }

  return resultado;
}


async function actualizarProducto(id, datos) {
  let resultado = {};
  if (id && id.length == 24) {
    if (datos && Object.keys(datos).length > 0) {
      if (datos.productos.nombre && datos.productos.nombre !== "") {
        let resConsulta = await modelProductos.actualizarUno(id, datos);
        if (resConsulta && resConsulta.acknowledged) {
          resultado.mensaje = "Producto Actualizado correctamente";
          resultado.datos = resConsulta;
        } else {
          resultado.mensaje = "Error al actualizar";
          resultado.datos = resConsulta;
        }
      } else {
        resultado.mensaje = "nombre vacio";
        resultado.datos = datos.productos.nombre ? datos.productos.nombre : "";
      }
    } else {
      resultado.mensaje = "No hay datos";
      resultado.datos = datos;
    }
  } else {
    resultado.mensaje = "ID invalido";
    resultado.datos = id;
  }
  return resultado;
};


module.exports.obtenerProductos=obtenerProductos;
module.exports.crearProducto=crearProducto;
module.exports.actualizarProducto=actualizarProducto;
