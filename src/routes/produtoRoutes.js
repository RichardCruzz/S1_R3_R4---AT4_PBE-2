import { Router } from "express";
import produtoController from "../controllers/produtoController.js";
import uploadImage from "../middlewares/uploadImageMiddleware.js";

const produtoRoutes = Router();

produtoRoutes.get('/', produtoController.selecionar);
produtoRoutes.post('/', uploadImage, produtoController.criar);
produtoRoutes.put('/:id', produtoController.editar);
produtoRoutes.delete('/:id', produtoController.deletar);

export default produtoRoutes;