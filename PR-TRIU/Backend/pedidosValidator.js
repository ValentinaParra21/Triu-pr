import Joi from "joi";


const id = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        "string.pattern.base":
            "El campo ID debe ser un ObjectId valido de 24 caracteres hexadecimales.",
        "any.required":"El campo ID es requerido.",
    });


const fecha = Joi.date().messages({
    "date.base":"Tiene que ingrear el campo"

});
const hora  = Joi.string().messages({
    "string.base":"El tiene que ingrear la hora am o pm"
});
const total = Joi.number().precision(1).min(1).max(1000000).messages({
    "number.base": "La cantidad debe ser un número.",
    "number.min": "La cantidad debe ser mayor e igual a 1.",
    "number.max": "La cantidad no puede exceder 100000.",
});
const Descripcion= Joi.string()
    .min(3)
    .max(90)
    .messages({
        "string.min": "La descripción debe tener al menos 3 caracteres.",
        "string.max": "La descripción no puede exceder los 90 caracteres.",
    });

const CodigoP= Joi.number().messages({
    "number.base": "El registro debe de ser numero entero.",

})

const estado= Joi.string().valid( "Activo" , "inactivo").optional().messages({
    "any.only": "El estado de ser 'Activo' o 'inactivo' "
})

const createPedidoSchema = Joi.object({
    fecha:fecha.required(),
    hora:hora.required(),
    total:total.required(),
    Descripcion:Descripcion.required(),
    CodigoP:CodigoP.required(),
    estado:estado.required(),
})
const updatePedidoSchema = Joi.object({
    fecha:fecha.required(),
    hora:hora.required(),
    total:total.required(),
    Descripcion:Descripcion.required(),
    CodigoP:CodigoP.required(),
    estado:estado.required(),
})

const getPedidosSchema = Joi.object({
    id: id.required(),
});

const deletePedidoSchema = Joi.object({
    id: id.required(),

})

export{
    createPedidoSchema,
    updatePedidoSchema,
    getPedidosSchema,
    deletePedidoSchema
}