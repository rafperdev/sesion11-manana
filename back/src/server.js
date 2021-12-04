const express = require("express");
const cors = require("cors");
const { productos } = require("./datos.js");

const app = express();
app.use(cors());//Middleware cors
app.use(express.json()) // Middleware convierte a json
//API HOME: Rutas, endpoint
app.get("/", (req, res) => {
    res.send("<h1>Hola al mundo dev</h1>");
});

//API CONSULTAR
app.get("/producto/consultar/:name", (req, res) => {
    let estado = "error";
    let msg = "NO Encontrado";
    const nombre = req.params.name;
    const prod = productos.find(p => p.title.toLowerCase() == nombre.toLowerCase());    
    if (prod != null){
        estado = "ok";
        msg = "Encontrado";
    }
    res.send({ estado, msg, prod });
});

/**
 * API Guardar Producto
 * Ruta : /producto/guardar
 * Método : POST
 * Datos de entrada : {nombre:"pan",precio:20,stock:10} 
 * Respuesta : {estado: "ok", msg:"Producto Guardado :)"}
 */
app.post("/producto/guardar", function (req, res) {
    // Capturar los datos que vienen del cliente
    const { nombre, precio, stock } = req.body;
    // Crear un JSON de producto con los datos
    const prod = { title: nombre, price: precio, stock };
    // Insertar el nuevo producto en la 'BD' Productos
    productos.push(prod);
    console.log(productos);
    // Enviar Respuesta al cliente
    res.send({ estado: "ok", msg: "Producto Guardado :)" })
})

/**
 * API Editar Producto
 * Ruta : /producto/editar
 * Método : POST
 * Datos de entrada : {nombre:"pan",precio:20,stock:10} 
 * Respuesta : {estado: "ok", msg:"Producto Guardado :)"}
 */
app.post("/producto/editar", function (req, res) {
    // Capturar los datos que vienen del cliente
    const { nombre, precio, stock } = req.body;
    // Buscar el producto a editar
    let i = 0;
    for (const p of productos) {
        if (p.title.toLowerCase() == nombre.toLowerCase()) {
            // Editar las claves correspondiente
            productos[i].price = precio;
            productos[i].stock = stock;
            break;
        }
        i++;
    }
    // Enviar Respuesta al cliente
    res.send({ estado: "ok", msg: "Producto Editado :)" })
})

/**
 * API Eliminar Producto
 * Ruta : /producto/eliminar
 * Método : POST
 * Datos de entrada : {nombre:"pan",precio:20,stock:10} 
 * Respuesta : {estado: "ok", msg:"Producto Eliminado :)"}
 */
app.post("/producto/eliminar", function (req, res) {
    // Capturar los datos que vienen del cliente
    const { nombre } = req.body;
    // Buscar el producto a editar
    let i = 0;
    for (const p of productos) {
        if (p.title.toLowerCase() == nombre.toLowerCase()) {
            productos.splice(i, 1);
            break;
        }
        i++;
    }
    // Enviar Respuesta al cliente
    res.send({ estado: "ok", msg: "Producto Editado :)" })
})

app.listen(8081, () => {
    console.log("Servidor corriendo en el puerto 8081")
});