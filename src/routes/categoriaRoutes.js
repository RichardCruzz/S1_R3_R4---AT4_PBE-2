import { Router } from "express";
import categoriaController from "../controllers/categoriaController.js";

const categoriaRoutes = Router();

categoriaRoutes.get('/', categoriaController.selecionar);
categoriaRoutes.post('/', categoriaController.criar);
categoriaRoutes.put('/:id', categoriaController.editar);
categoriaRoutes.delete('/:id', categoriaController.deletar);

export default categoriaRoutes;