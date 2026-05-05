import { ItensPedido } from "../models/itensPedidos.js";
import { Pedido } from "../models/Pedido.js";
import pedidoRepository from "../repositories/pedidoRepository.js";
import { statusPed } from "../enums/statusPedido.js";

const pedidoController = {
    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    criar: async (req, res) => {
        try {
            let { clienteId, itens } = req.body;

            const itensPedido = itens.map(item => 
                ItensPedido.criar({
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    valorItem: item.valorItem
                })
            );

            const subTotal = ItensPedido.calcularSubTotalItens(itensPedido);
            const pedido = Pedido.criar({clienteId, subTotal, status: statusPed.ABERTO });

            const result = await pedidoRepository.criar(pedido, itensPedido);
            res.status(201).json({ data: result });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    editar: async (req, res) => {
        try {
            const idCliente = req.params.id;

            const { nome, cpf, telefone, cep, numero, complemento } = req.body;

            if (!validarCpf(cpf))
                return res.status(400).json({ message: "CPF inválido" });

            let endereco = null;

            //Junta os dados do cliente com a API do viaCEP
            if (cep) {
                const resApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

                endereco = {
                    cep,
                    logradouro: resApi.data.logradouro,
                    bairro: resApi.data.bairro,
                    cidade: resApi.data.localidade,
                    uf: resApi.data.uf,
                    numero: numero,
                    complemento
                };
            }

            const cliente = {idCliente, nome, cpf };

            const result = await clienteRepository.editar(cliente, endereco, telefone);

            res.status(200).json(result);

        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
    deletar: async (req, res) => {
        try {
            const idCliente = req.params.id;
            const result = await clienteRepository.deletar(idCliente);
            res.status(200).json({ result });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    }

}

export default pedidoController;