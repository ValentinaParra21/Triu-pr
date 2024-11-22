import Joi from "joi";

//Creamos las validaciones para cada campo
const id = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base":
      "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
    "any.required": "El campo ID es requerido.",
  });

const nombre = Joi.string()
  .min(3)
  .max(90)
  .required()
  .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
  .messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre no puede exceder los 90 caracteres.",
    "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    "any.required": "El nombre es un campo requerido",
  });
  const apellidos = Joi.string()
  .min(3)
  .max(90)
  .required()
  .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
  .messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre no puede exceder los 90 caracteres.",
    "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    "any.required": "El nombre es un campo requerido",
  });
const correo = Joi.string() // Validar que sea de tipo string
    .email({ tlds: { allow: false } }) // Validar que sea un correo electrónico
    .required() 
    .messages({
      "string.email": "El campo correo debe ser un correo electrónico válido",
      "any.required": "El campo correo es requerido",
    });

const rol = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        "string.pattern.base": "El campo 'rol' debe ser un ObjectId válido.",
        "any.required": "El campo 'rol' es requerido."
    });



const createUsuarioSchema = Joi.object({
  nombre: nombre.required(),
  apellidos: apellidos.required(),
  correo: correo.required(),
  rol: rol.required(),
}); 

const updateUsuarioSchema = Joi.object({
  nombre: nombre.required(),
  apellidos: apellidos.required(),
  correo: correo.required(),
  rol: rol.required(),
});

const getUsuarioSchema = Joi.object({
  id: id.required(),
});

const deleteUsuarioSchema = Joi.object({ 
  id: id.required(),
});

export { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema, deleteUsuarioSchema };
