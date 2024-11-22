import Facturas from "../models/facturaModel.js";
import { middleware } from "../middleware/middleware.js";
import {
  createFacturaSchema,
  updateFacturaSchema,
  getFacturaSchema,
  deleteFacturaSchema,
} from "../validators/facturaValidator.js";

// Crear factura
export const createFactura = [
  middleware(createFacturaSchema, "body"),
  async (req, res) => {
    const Factura = new Facturas(req.body);
    try {
      const data = await Factura.save();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Obtener todas las facturas
export const getFactura = (req, res) => {
  Facturas.find()
    .populate("Pedidos")
    .then((data) => res.status(200).json(data)) 
    .catch((error) => res.status(500).json({ message: error.message })); 
};

// Obtener factura por ID
export const getFacturasEs = [
  middleware(getFacturaSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const factura = await Facturas.findById(id).populate("Pedidos");
      if (!factura) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }
      res.status(200).json(factura);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Actualizar factura
export const updateFactura = [
  middleware(getFacturaSchema, "params"),
  middleware(updateFacturaSchema, "body"),
  async (req, res) => {
    const { id } = req.params;
    const { nombre, celular, valor, correo, Pedidos } = req.body;
    try {
      const FacturaUpdate = await Facturas.updateOne(
        { _id: id },
        { $set: { nombre, celular, valor, correo, Pedidos } }
      );
      if (FacturaUpdate.matchedCount === 0) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }
      if (FacturaUpdate.modifiedCount === 0) {
        return res
          .status(400)
          .json({ message: "No se realizaron cambios en la Factura" });
      }
      res.status(200).json({ message: "Factura actualizada correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Eliminar factura
export const deleteFactura = [
  middleware(deleteFacturaSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Facturas.deleteOne({ _id: id }); 
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }
      res.status(200).json({ message: "Factura eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
