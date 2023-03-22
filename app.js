const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');
const conexion = require('./database/connection');
const controladorProductos = require('./api/productos/controller');

/* Configuración inicial */
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(compression());

/* Rutas */
app.use("/api/productos", controladorProductos);

/* Iniciar el servidor */
(async () => {
  try {
    await conexion.conectar();
    app.listen(port, () => {
      console.log(`API ejecutándose en el puerto ${port}`);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
})();
