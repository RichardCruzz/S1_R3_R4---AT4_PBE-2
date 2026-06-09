import clienteRepository from "../repositories/clienteRepository.js";
import { Cliente } from "../models/Cliente.js";
import { Telefone } from "../models/Telefone.js";
import { Endereco } from "../models/Endereco.js";
import validarCPF from "../utils/validarCpf.js";
import { limparNumeros } from "../utils/limparNumeros.js"; 

const CEP_REGEX = /^[0-9]{8}$/;

const clienteController = {

    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();
            res.status(200).json({ result });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    criar: async (req, res) => {
        try {
            const { nome, cpf, telefone, cep, numero, complemento } = req.body;

            if (!nome || !cpf || !telefone || !cep || !numero) {
                return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
            }

            if (!CEP_REGEX.test(cep)) {
                return res.status(400).json({ message: 'Verifique o CEP informado' });
            }

            if (!validarCPF(cpf)) {
                return res.status(400).json({ message: 'CPF inválido' });
            }

            const dadosCep = await consultaCep(cep);

            const cliente = Cliente.criar({ nome, cpf });
            const telefones = Telefone.criar({ telefone });
            const endereco = Endereco.criar({
                cep,
                numero,
                complemento,
                logradouro: dadosCep.logradouro,
                bairro: dadosCep.bairro,
                cidade: dadosCep.localidade,
                uf: dadosCep.uf
            });

            const result = await clienteRepository.criar(cliente, endereco, telefones);
            res.status(201).json({ data: result });

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
            const idCliente = req.params.id;
            const { nome, cpf, telefone, cep, numero, complemento } = req.body;

            if (!validarCPF(cpf)) {
                return res.status(400).json({ message: 'CPF inválido' });
            }

            let endereco = null;

            if (cep) {
                if (!CEP_REGEX.test(cep)) {
                    return res.status(400).json({ message: 'Verifique o CEP informado' });
                }

                const dadosCep = await consultaCep(cep);

                endereco = {
                    cep,
                    logradouro: dadosCep.logradouro,
                    bairro: dadosCep.bairro,
                    cidade: dadosCep.localidade,
                    uf: dadosCep.uf,
                    numero,
                    complemento
                };
            }

            const cliente = { idCliente, nome, cpf };
            const result = await clienteRepository.editar(cliente, endereco, telefone);

            if (!result) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }

            res.status(200).json(result);

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
            const idCliente = req.params.id;
            const result = await clienteRepository.deletar(idCliente);

            if (!result) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }

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

export default clienteController;