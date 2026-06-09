import { Categoria } from "../models/Categoria.js";
import categoriaRepository from "../repositories/categoriaRepository.js";

const categoriaController = {

    criar: async (req, res) => {
        try {
            const { nome, descricao } = req.body;

            if (!nome || !descricao || nome.length < 3) {
                return res.status(400).json({ message: 'Verifique os dados enviados' });
            }

            const categoria = Categoria.criar({ nome, descricao });
            const result = await categoriaRepository.criar(categoria);
            res.status(201).json({ result });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const { nome, descricao } = req.body;

            if (!nome || !descricao || nome.length < 3) {
                return res.status(400).json({ message: 'Verifique os dados enviados' });
            }

            const categoria = Categoria.alterar({ nome, descricao }, id);
            const result = await categoriaRepository.editar(categoria);

            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await categoriaRepository.deletar(id);

            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await categoriaRepository.selecionar();
            res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    }
};

export default categoriaController;