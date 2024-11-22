import mongoose from "mongoose";

const platilloSchema = mongoose.Schema({
    nombre:{
        type : String,
        required: true,
    },
    precio:{
        type : Number,
        required: true,
    },
    descripcion: {
        type : String,
        required: true,
    },
    estado : {
        type: String,
        enum : ["activo","inactivo"],
        required: true,
        default: "activo"
    },
    categoria : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true 
    }
});

export default mongoose.model("platillos",platilloSchema);