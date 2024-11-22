import mongoose from "mongoose";

const rolSchema = mongoose.Schema({
    rol: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    }
});

export default mongoose.model("rol", rolSchema);