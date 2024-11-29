import mongoose from "mongoose";

const PedidosSchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true,
    },

    total: {
        type: Number,
        required: true
    },

    Descripcion: {
        type: String,
        required: true
    },
    estado:{
        type: String,
        enum: ["Activo", "Inactivo"],
        required: true,
        default: "Activo"
    }
});

export default mongoose.model("Pedidos", PedidosSchema);
