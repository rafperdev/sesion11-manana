const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { usuarioRutas } = require("./rutas/usuarioRutas");
const { productoRutas } = require("./rutas/productoRutas");
const { ventasRutas } = require("./rutas/ventasRutas");
const app = express();
app.use(cors());//Middleware cors
app.use(express.json()) // Middleware convierte a json
require("dotenv").config();

//APIs
app.use("/users", usuarioRutas);
app.use("/producto", productoRutas);
app.use("/venta", ventasRutas);

mongoose.connect("mongodb://127.0.0.1:27017/mall")
    .then(res => console.log("Conectado a BD"))
    .catch(error => console.log(error));

app.listen(8081, () => {
    console.log("Servidor corriendo en el puerto 8081")
});