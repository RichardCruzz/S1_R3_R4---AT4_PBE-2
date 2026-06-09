import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const pedidoRoutes = Router();

pedidoRoutes.get('/:idCliente', pedidoController.selecionar);
pedidoRoutes.post('/', pedidoController.criar);
pedidoRoutes.put('/:id', pedidoController.editar);
pedidoRoutes.delete('/:id', pedidoController.deletar);

export default pedidoRoutes;