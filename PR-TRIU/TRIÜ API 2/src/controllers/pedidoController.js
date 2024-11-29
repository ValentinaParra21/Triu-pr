import Pedidos from "../models/pedidoModel.js";
import { middleware } from "../middleware/middleware.js";
import{    createPedidoSchema,
           updatePedidoSchema,
           getPedidosSchema,
           deletePedidoSchema} from "../validators/pedidosValidator.js";

export const createPedido=[
    middleware(createPedidoSchema, "body"),

    async (req, res) => {
        const pedido = new Pedidos(req.body);
        await pedido
            .save()
            .then((data) => res.status(201).json(data))
            .catch((error) => res.status(501).json({ message: error }));
    },
];

export const getPedido  = (req, res) => {
    Pedidos
        .find()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(501).json({ message: error }));
};

export const getPedidoEs =[
    middleware(getPedidosSchema, "params"),
    async (req, res) =>{
        const { id } = req.params;
        try {
         const pedido = await Pedidos.findById(id);
         if (!pedido) {
            return ress.status(404).json({
                message: "Pedido no encontrado"
            });
         }
         res.json(pedido);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },
];


export const updatePedido = [
    middleware(getPedidosSchema, "params"),
    middleware(updatePedidoSchema, "body"),
    async (req, res) => {
      const { id } = req.params;
      const {  fecha, hora, total, Descripcion,estado } = req.body;
      try {
        const FacturaUpdate = await Pedidos.updateOne(
          { _id: id },
          { $set: { fecha, hora, total, Descripcion,estado} }
        );
        if (FacturaUpdate.matchedCount === 0) {
          return res.status(404).json({ message: "Pedido no encontrada" });
        }
        if (FacturaUpdate.modifiedCount === 0) {
          return res
            .status(400)
            .json({ message: "No se realizaron cambios en la Pedido" });
        }
        res.status(200).json({ message: "Pedido actualizada correctamente" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  ];

  export const deletePedido = [
    middleware(deletePedidoSchema, "params"),
  
    async (req, res) => {
      const { id } = req.params;
      try {
        const result = await Pedidos.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
          res.status(404).json({ message: "Pedido no encontrada" });
        }
        res.status(200).json({ message: "Pedidos eliminada correctamente" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
];