import userSchema from "../models/userModel.js";
import {middleware} from "../middleware/middleware.js";


import {createUsuarioSchema, getUsuarioSchema, updateUsuarioSchema, deleteUsuarioSchema,                                                                                                                                                                                                                                                                                
} from "../validators/usuarioValidator.js"



//   res.send("Esta ruta esta pensada para crear un usuario nuevo");
export const CreateUsuario = [
  middleware(createUsuarioSchema, "body"),
  async (req, res) => {
    const Usuario = new userSchema(req.body);

    await Usuario
      .save()
      .then((data) => res.status(201).json(data)) 
      .catch((error) => res.status(500).json({ message: error.message })); 
  },
]; 

export const getUsuario = (req, resp) => {
  userSchema
    .find()
    .populate('rol')
    .then((data) => resp.json(data))
    .catch((error) => resp.json({ message: error }));
};

export const getUsuarioById = [
  middleware(getUsuarioSchema, "params"),
  async (req, resp) => {
    const { id } = req.params;
    try {

      const Usuario = await userSchema.findById(id).populate('rol');
      if (!Usuario) {
        return resp.status(404).json({
          message: "Usuario no encontrado",
        });
      }
      resp.json(Usuario);
    } catch (error) {
      resp.status(500).json({
        message: error.message,
      });
    }
  },
];

export const updateUsuario = [
  middleware(getUsuarioSchema, "params"),
  middleware(updateUsuarioSchema, "body"),
  async (req, resp) => {
    const { id } = req.params;
    const { nombre, apellidos, correo, rol } = req.body;
    try {
      const UsuarioUpdate = await userSchema.updateOne(
        { _id: id },
        { $set: { nombre, apellidos, correo, rol } }
      );
      if (UsuarioUpdate.matchedCount === 0) {
        return resp.status(404).json({ message: "Pedido no encontrado" });
      }
      if (UsuarioUpdate.modifiedCount === 0) {
        return resp
          .status(400)
          .json({ message: "No se realizaron cambios al Usuario" });
      }
      resp.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];

////
export const deleteUsuario = [
  middleware(deleteUsuarioSchema, "params"),

  async (req, resp) => {
    const { id } = req.params;
    try {
      const result = userSchema.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        resp.status(404).json({ message: "Usuario no encontrado" });
      }
      resp.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];
