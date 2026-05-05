import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";
const pedidosRoutes = Router();

pedidosRoutes.post('/', pedidoController.criar);

export default pedidosRoutes;