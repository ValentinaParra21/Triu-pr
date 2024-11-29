
import mongoose from "mongoose";

const FacturasSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  celular: {
    type: Number,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  correo: {
    type: String,
    required: false
  },
  Pedidos: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pedidos',
      required: true
    }
  
});

export default mongoose.model("Facturas", FacturasSchema);