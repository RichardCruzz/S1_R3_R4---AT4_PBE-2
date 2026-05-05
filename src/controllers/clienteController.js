import axios from "axios";
import clienteRepository from "../repositories/clienteRepository.js";
import { Cliente } from "../models/Cliente.js";
import { Telefone } from "../models/Telefone.js";
import { Endereco } from "../models/Endereco.js";
import { limparNumeros } from "../utils/limparNumeros.js";
import validarCpf from "../utils/validarCpf.js";

const clienteController = {
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
            const { nome, cpf, telefone, cep, numero, complemento } = req.body;
            const cepRegex = /^[0-9]{8}$/;
            if (!cepRegex.test(cep)) {
                return res.status(400).json({ message: 'Verifique o cep informado!' });
            }

            if (!validarCpf(cpf))
                return res.status(400).json({ message: "CPF inválido" });
            // limparNumeros(numero);

            // const numeroLimpo = limparNumeros(numero);

            const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
            if (respApi.data.erro) {
                throw new Error('Erro ao consultar o cep na API');
            }

            // criar objeto cliente
            const cliente = Cliente.criar({ nome, cpf });

            // criar objeto telefone
            const telefones = Telefone.criar({ telefone });

            // criar objeto endereço
            const endereco = Endereco.criar({
                cep: cep,
                numero: numero,
                complemento: complemento,
                logradouro: respApi.data.logradouro,
                bairro: respApi.data.bairro,
                cidade: respApi.data.localidade,
                uf: respApi.data.uf
            });

            const result = await clienteRepository.criar(cliente, endereco, telefones);
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

export default clienteController;

async function consultaCep(cep) {
    try {
        const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (respApi.data.erro) {
            throw new Error('CEP não encontrado');
        }
        return respApi.data;

    } catch (error) {
        console.error(error)
        throw new Error("Erro ao buscar o CEP", error.menssage);
    }


}