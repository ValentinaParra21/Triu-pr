// controllers/usuarioController.js

import bcrypt from "bcrypt"; 
import userSchema from "../models/userModel.js";
import { middleware } from "../middleware/middleware.js";
import {
  createUsuarioSchema,
  getUsuarioSchema,
  updateUsuarioSchema,
  deleteUsuarioSchema,
} from "../validators/usuarioValidator.js";

// Función para hashear contraseñas
const hashPassword = async (password) => {
  const saltRounds = 5;
  return await bcrypt.hash(password, saltRounds);
};

// Crear Usuario
export const CreateUsuario = [
  middleware(createUsuarioSchema, "body"), // Validación de los datos
  async (req, res) => {
    try {
      // Hashear la contraseña antes de guardarla
      const hashedPassword = await hashPassword(req.body.password);
      const Usuario = new userSchema({ ...req.body, password: hashedPassword });

      const data = await Usuario.save(); // Guarda el usuario en la base de datos
      res.status(201).json(data); // Responde con éxito
    } catch (error) {
      res.status(500).json({ message: error.message }); // Maneja errores
    }
  },
];

// Obtener todos los usuarios
export const getUsuario = async (req, resp) => {
  try {
    const usuarios = await userSchema.find().populate("rol"); // Busca y popula roles
    resp.status(200).json(usuarios); // Devuelve la lista de usuarios
  } catch (error) {
    resp.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Obtener usuario por ID
export const getUsuarioById = [
  middleware(getUsuarioSchema, "params"), // Valida el ID
  async (req, resp) => {
    const { id } = req.params;
    try {
      const Usuario = await userSchema.findById(id).populate("rol"); // Busca por ID
      if (!Usuario) {
        return resp.status(404).json({ message: "Usuario no encontrado" });
      }
      resp.status(200).json(Usuario); // Responde con el usuario encontrado
    } catch (error) {
      resp.status(500).json({ message: error.message }); // Manejo de errores
    }
  },
];

// Actualizar Usuario
export const updateUsuario = [
  middleware(getUsuarioSchema, "params"), 
  middleware(updateUsuarioSchema, "body"), 
  async (req, resp) => {
    const { id } = req.params;
    const { password, ...rest } = req.body;

    try {
      const updates = { ...rest };
      if (password) {
        updates.password = await hashPassword(password); 
      }

      const UsuarioUpdate = await userSchema.updateOne({ _id: id }, { $set: updates });

      if (UsuarioUpdate.matchedCount === 0) {
        return resp.status(404).json({ message: "Usuario no encontrado" });
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

export const deleteUsuario = [
  middleware(deleteUsuarioSchema, "params"), 
  async (req, resp) => {
    const { id } = req.params;
    try {
      const result = await userSchema.deleteOne({ _id: id }); 
      if (result.deletedCount === 0) {
        return resp.status(404).json({ message: "Usuario no encontrado" }); 
      }
      resp.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message }); 
    }
  },
];
