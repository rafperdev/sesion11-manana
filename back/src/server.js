const express = require("express");
const cors = require("cors");
const { productos } = require("./datos.js");

const app = express();
app.use(cors());
//API HOME: Rutas, endpoint
app.get("/", (req, res) => {
    res.send("Hola al mundo dev");
});

//API CONSULTAR
app.get("/producto/consultar/:name", (req, res) => {
    const nombre = req.params.name;
    const prod = productos.find(p => p.title.toLowerCase() == nombre.toLowerCase());
    res.send(prod);
})

app.listen(8081, () => {
    console.log("Servidor corriendo en el puerto 8080")
});