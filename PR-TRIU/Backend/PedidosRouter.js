import express from "express";
import{createPedido,getPedido,getPedidoEs,updatePedido,deletePedido} from "../controllers/pedidoControlador.js";
const rounter = express.Router();



// 1. Crear usuarios
/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     description: Permite crear un nuevo pedido.
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error en los datos del pedido
 */
rounter.post("/Pedidos",createPedido);




// 2.  Buscar datos
/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     description: Devuelve todos los pedidos realizados.
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 */


rounter.get("/Pedidos", getPedido);



// 3. Buscar datos especificos
/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     description: Devuelve los detalles de un pedido específico usando su ID.
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido que se desea obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido no encontrado
 */
rounter.get("/Pedidos/:id",getPedidoEs);




// 4. Actualiar un datos en especifico 
/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Actualizar un pedido existente
 *     description: Permite actualizar los datos de un pedido existente.
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido que se desea actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       200:
 *         description: Pedido actualizado exitosamente
 *       400:
 *         description: Error en los datos del pedido
 *       404:
 *         description: Pedido no encontrado
 */
rounter.put("/Pedidos/:id",updatePedido)


// 5. Borrar datos
/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Eliminar un pedido
 *     description: Permite eliminar un pedido por su ID.
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido eliminado exitosamente
 *       404:
 *         description: Pedido no encontrado
 */
rounter.delete("/Pedidos/:id",deletePedido);

export default rounter;
