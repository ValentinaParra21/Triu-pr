import express from "express";
import { createFactura,getFactura,getFacturasEs,updateFactura,deleteFactura } from "../controllers/FacturaControlador.js";

const Frouter = express.Router()


// 1. Crear facturas
/**
 * @swagger
 * /facturas:
 *   post:
 *     summary: Crear una nueva factura
 *     description: Permite crear una nueva factura.
 *     tags:
 *       - Facturas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       201:
 *         description: Factura creada exitosamente
 *       400:
 *         description: Error en los datos de la factura
 */
Frouter.post("/Facturas", createFactura);

// 2. Obtener todas las facturas
/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Obtener todas las facturas
 *     description: Devuelve todas las facturas registradas.
 *     tags:
 *       - Facturas
 *     responses:
 *       200:
 *         description: Lista de facturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 */
Frouter.get("/Facturas", getFactura);

// 3. Obtener una factura por ID
/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     summary: Obtener una factura por ID
 *     description: Devuelve los detalles de una factura específica usando su ID.
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la factura que se desea obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Factura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       404:
 *         description: Factura no encontrada
 */
Frouter.get("/Facturas/:id", getFacturasEs);

// 4. Actualizar una factura existente
/**
 * @swagger
 * /facturas/{id}:
 *   put:
 *     summary: Actualizar una factura existente
 *     description: Permite actualizar los datos de una factura existente.
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la factura que se desea actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       200:
 *         description: Factura actualizada exitosamente
 *       400:
 *         description: Error en los datos de la factura
 *       404:
 *         description: Factura no encontrada
 */
Frouter.put("/Facturas/:id", updateFactura);

// 5. Eliminar una factura
/**
 * @swagger
 * /facturas/{id}:
 *   delete:
 *     summary: Eliminar una factura
 *     description: Permite eliminar una factura por su ID.
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la factura a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Factura eliminada exitosamente
 *       404:
 *         description: Factura no encontrada
 */
Frouter.delete("/Facturas/:id", deleteFactura);

export default Frouter;



