export class Cliente {
    #idCliente;
    #nome;
    #cpf;
    #dataCad;

    constructor(pNome, pCpf, pIdCliente) {
        this.idCliente = pIdCliente;
        this.nome = pNome;
        this.cpf = pCpf;
    }

    //Métodos acessores - GETTERS e SETTERS
    get idCliente() {
        return this.#idCliente;
    }
    set idCliente(value) {
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(value) {
        this.#validarCpf(value);
        this.#cpf = value;
    }

    //Métodos auxiliares
    #validarIdCliente(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o Id informado');
        }
    }
    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }
    #validarCpf(value) {
        if (!value || isNaN(value)) {
            throw new Error('O campo CPF é obrigatória e deve ser um número válido');
        }
    }
    static criar(dados) {
        return new Cliente(dados.nome, dados.cpf, null);
    }

}