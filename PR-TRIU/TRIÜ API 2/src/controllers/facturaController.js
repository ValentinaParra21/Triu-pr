import Facturas from "../models/facturaModel.js";
import { middleware } from "../middleware/middleware.js";
import {
    createFacturaSchema,
    updateFacturaSchema,
    getFacturaSchema,
    deleteFacturaSchema,
} from "../validators/facturaValidator.js"

export const createFactura=[
    middleware(createFacturaSchema, "body"),

    async (req, res) => {
        const Factura = new Facturas(req.body);
        await Factura
            .save()
            .then((data) => res.status(201).json(data))
            .catch((error) => res.status(501).json({ message: error }));
    },   
];    


export const getFactura = (req, res) => {
    Facturas
        .find()
        .populate("Pedidos")
        .then((data) => res.status(301).json(data))
        .catch((error) => res.status(501).json({ message: error }));
};


export const getFacturasEs = [
    middleware(getFacturaSchema, "params"),
    async (req, res) => {
     const { id } = req.params;
      try {
        const factura = await Facturas.findById(id).populate("Pedidos");
        if (!factura) {
          return res.status(404).json({
            message: "Factura no encontrada",
          });
        }
        res.json(factura);
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    },
  ];



export const updateFactura = [
    middleware(getFacturaSchema, "params"),
    middleware(updateFacturaSchema, "body"),
    async (req, res) => {
      const { id } = req.params;
      const {  fecha, hora, Ptotal, Descripcion, CodigoP } = req.body;
      try {
        const FacturaUpdate = await Facturas.updateOne(
          { _id: id },
          { $set: { fecha, hora, Ptotal, Descripcion, CodigoP } }
        );
        if (FacturaUpdate.matchedCount === 0) {
          return res.status(404).json({ message: "Categoria no encontrada" });
        }
        if (FacturaUpdate.modifiedCount === 0) {
          return res
            .status(400)
            .json({ message: "No se realizaron cambios en la categoria" });
        }
        res.status(200).json({ message: "Categoria actualizada correctamente" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  ];

export const deleteFactura = [
    middleware(deleteFacturaSchema, "params"),
  
    async (req, res) => {
      const { id } = req.params;
      try {
        const result = Facturas.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
          res.status(404).json({ message: "Categoria no encontrada" });
        }
        res.status(200).json({ message: "Categoria eliminada correctamente" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
];
  

