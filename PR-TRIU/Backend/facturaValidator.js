import Joi from "joi";

const id = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        "string.pattern.base":
            "El campo ID debe ser un ObjectId valido de 24 caracteres hexadecimales.",
        "any.required":"El campo ID es requerido.",
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

const celular =Joi.number().precision(1).min(10).message({
    "number.base": "El numero debe ser un número.",
    "number.min": "El numero debe ser mayor e igual a 1 digitos.",
    "number.max": "La numero no puede exceder 10 digitos.",
})

const valor = Joi.number().precision(1).min(1).max(100000).messages({
    "number.base": "La cantidad debe ser un número.",
    "number.min": "La cantidad debe ser mayor e igual a 1.",
    "number.max": "La cantidad no puede exceder 1000.",
});

const correo = Joi.string().email().messages({
    "string.base": "El correo tiene coinsidir",
    "string.email": "El correo debe tener un formato valido",
})
const Pedidos = Joi.string()
.pattern(/^[0-9a-fA-F]{24}$/)
.required()
.messages({
    "string.pattern.base": "El campo 'Pedidos' debe ser un ObjectId válido.",
    "any.required": "El campo 'Pedidos' es requerido."
});

const createFacturaSchema = Joi.object({
    nombre: nombre.required(),
    celular: celular.required(),
    valor: valor.required(),
    correo: correo, 
    Pedidos: Pedidos.required(),
});

const updateFacturaSchema = Joi.object({
    nombre: nombre.required(),
    celular: celular.required(),
    valor: valor.required(),
    correo: correo, 
    Pedidos: Pedidos.required(),
});

const getFacturaSchema = Joi.object({
    id: id.required(),
});

const deleteFacturaSchema = Joi.object({
    id: id.required(),
});

export{
    createFacturaSchema,
    updateFacturaSchema,
    getFacturaSchema,
    deleteFacturaSchema,
};