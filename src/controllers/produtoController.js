import { Produto } from "../models/Produto.js";
//import { Categoria} from "../models/Categoria.js";
import produtoRepository from "../repositories/produtoRepository.js";

 const produtoController = {
     selecionar: async (req, res) => {
         try {
             const result = await produtoRepository.selecionar();
             res.status(200).json({ result });
         } catch (error) {
             console.log(error)
             res.status(500).json({message: 'Ocorreu um erro no servidor',
             errorMessage: error.message });
         }
     },
    criar: async (req, res) => {
        try {
            if(!req.file){
                return res.status(400).json({message: 'arquivo não foi enviado'});
            }
            const { idCategoria, nome, valor} = req.body;

            if (!idCategoria || !nome || !valor || nome.lenght < 3 || Number(valor) <= 0) {
                return res.status(400).json({ message: 'Verifique os dados enviados' });
            }
            
            const vinculoImg = `/uploads/imagens/${req.file.filename}`;

            const produto = Produto.criar({ idCategoria, nome, valor, vinculoImg });
            const result = await produtoRepository.criar(produto);
            res.status(201).json({ result });

        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ocorreu um erro no servidor',
            errorMessage: error.message });
        }
    },
    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const { idCategoria, nome, valor } = req.body;
            
            if (!idCategoria || !nome || !valor || !id || idCategoria <= 0 || nome.lenght < 3 || Number(valor) <= 0 || id <= 0 ) {
                return res.status(400).json({ message: 'Verifique os dados enviados' });
            }

            const produto = Produto.alterar({ idCategoria, nome, valor }, id);

            const result = await produtoRepository.editar(produto);
            res.status(200).json({ result });
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ocorreu um erro no servidor',
            errorMessage: error.message });
        }
    },
    deletar: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoRepository.deletar(id);
            res.status(200).json({ result });
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Ocorreu um erro no servidor',
            errorMessage: error.message });
        }
    }
}

export default produtoController;