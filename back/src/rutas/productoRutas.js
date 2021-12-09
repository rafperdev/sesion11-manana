const { Router } = require("express");
const productoRutas = Router();

//API CONSULTAR
productoRutas.post("/producto/consultar", (req, res) => {
    const { nombre } = req.body; //{nombre:"pan",precio:20}
    ProductosModel.findOne({ "nombre": nombre }, function (error, p) {
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
 * Ruta : /producto/guardar
 * Método : POST
 * Datos de entrada : {nombre:"pan",precio:20,stock:10} 
 * Respuesta : {estado: "ok", msg:"Producto Guardado :)"}
 */
 productoRutas.post("/producto/guardar", function (req, res) {
    const data = req.body;
    const prod = new ProductosModel(data);
    prod.save(function (error) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: Producto NO Guardado" });
        }
        res.send({ estado: "ok", msg: "Producto Guardado :)" });
    })
})

/**
 * API Editar Producto
 * Ruta : /producto/editar
 * Método : POST
 * Datos de entrada : {nombre:"pan",precio:20,stock:10} 
 * Respuesta : {estado: "ok", msg:"Producto Guardado :)"}
 */
productoRutas.post("/producto/editar", function (req, res) {
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
productoRutas.post("/producto/eliminar", function (req, res) {
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

export { productoRutas }