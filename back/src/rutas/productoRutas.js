const { Router } = require("express");
const productoRutas = Router();
const { productoModelo } = require("../modelos/productosModel");

//API CONSULTAR
productoRutas.post("/consultar", (req, res) => {
    const { nombre } = req.body; //{nombre:"pan",precio:20}
    productoModelo.findOne({ "nombre": nombre }, function (error, p) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: Al buscar producto" })
        } else {
            if (p != null) {
                return res.send({ estado: "ok", msg: "Producto encontrado", data: p })
            }
            return res.send({ estado: "error", msg: "Producto NO encontrado" })
        }
    })
});

productoRutas.get("/listar", (req, res) => {
    productoModelo.find({}, function (error, p) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: Al buscar producto" })
        } else {
            if (p != null) {
                return res.send({ estado: "ok", msg: "Producto encontrado", data: p })
            }
            return res.send({ estado: "error", msg: "Producto NO encontrado" })
        }
    })
});


/**
 * API Guardar Producto
 * Ruta : /guardar
 * Método : POST
 * Datos de entrada : {nombre:"pan",precio:20,stock:10} 
 * Respuesta : {estado: "ok", msg:"Producto Guardado :)"}
 */
 productoRutas.post("/guardar", function (req, res) {
    const data = req.body;
    const prod = new productoModelo(data);
    prod.save(function (error) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: Producto NO Guardado" });
        }
        res.send({ estado: "ok", msg: "Producto Guardado :)" });
    })
})

/**
 * API Editar Producto
 * Ruta : /editar
 * Método : POST
 * Datos de entrada : {nombre:"pan",precio:20,stock:10} 
 * Respuesta : {estado: "ok", msg:"Producto Guardado :)"}
 */
productoRutas.post("/editar", function (req, res) {
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
 * Ruta : /eliminar
 * Método : POST
 * Datos de entrada : {nombre:"pan",precio:20,stock:10} 
 * Respuesta : {estado: "ok", msg:"Producto Eliminado :)"}
 */
productoRutas.post("/eliminar", function (req, res) {
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

exports.productoRutas = productoRutas