import { Router } from "express";
import clienteController from "../controllers/clienteController.js";
const clienteRoutes = Router();

clienteRoutes.get('/', clienteController.selecionar);
clienteRoutes.post('/', clienteController.criar);
clienteRoutes.put('/:id', clienteController.editar);
clienteRoutes.delete('/:id', clienteController.deletar);

export default clienteRoutes;