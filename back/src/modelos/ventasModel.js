const { model, Schema } = require("mongoose");

const ventaSchema = new Schema({
    total: {
        type: "number",
        required: true
    },
    fecha: {
        type: "date",
        required: true,
        default: new Date
    },
    producto: {
        type: Schema.ObjectId,
        ref: "productos"
    },
    estado: {
        type: "number",
        required: true,
        default: 1
    }
})

const ventasModel = model("ventas", ventaSchema);
exports.ventasModel = ventasModel;