import express from "express";
import platilloRoutes from "./routes/platilloRoutes.js"; 
import categoriaRoutes from "./routes/categoriaRoutes.js"; 
import userRoutes from "./routes/usersRoutes.js";
import rolRoutes from "./routes/rolRoutes.js";
import pedidoRoutes from "./routes/pedidosRoutes.js";
import facturaRoutes from "./routes/facturaRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import cat_productoRoutes from "./routes/cat_productoRoutes.js";
import port from "./config/Conexion.js";
import bodyParser from "body-parser";
import swaggerJSDOCs from "./swagger.js";
import cors from "cors";    


const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Bienvenido a mi API REST</h1>");
});


app.use(express.json()); 
app.use(bodyParser.json());

app.use('/api/platillos', platilloRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/usuario', userRoutes);
app.use('/api/Rol', rolRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/facturas', facturaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/cat_productos', cat_productoRoutes);

//

//

app.listen(port, () => {
 console.log(`La aplicación se está ejecutando y está usando el puerto ${port}`);
 swaggerJSDOCs(app, 9001);
});