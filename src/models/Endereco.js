export class Endereco {
    #idEndereco; 
    #idCliente;  
    #uf;  
    #cep; 
    #logradouro;  
    #numero;  
    #complemento;  
    #cidade; 
    #bairro; 

    constructor(pIdCliente, pUf ,pCep, pLogradouro, pNumero, pComplemento ,pCidade, pBairro, pIdEndereco){
        this.idEndereco = pIdEndereco;
        this.idCliente = pIdCliente;
        this.uf = pUf;
        this.cep = pCep;
        this.logradouro = pLogradouro;
        this.numero = pNumero;
        this.complemento = pComplemento;
        this.cidade = pCidade;
        this.bairro = pBairro;
    }

    // GETTERS e SETTERS
    get idEndereco (){
        return this.#idEndereco;
    }
    set idEndereco(value){
        this.#validarIdEndereco(value);
        this.#idEndereco = value;
    }

    get idCliente (){
        return this.#idCliente;
    }
    set idCliente(value){
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    get uf(){
        return this.#uf;
    }
    set uf(value){        
        this.#validarUf(value);
        this.#uf = value;
    }

    get cep(){
        return this.#cep;
    }
    set cep(value){        
        this.#validarCep(value);
        this.#cep = value;
    }

    get cidade(){
        return this.#cidade; 
    }
    set cidade(value){
        this.#validarCidade(value); 
        this.#cidade = value
    }

    get logradouro(){
        return this.#logradouro;
    }
    set logradouro(value){        
        this.#validarLogradouro(value);
        this.#logradouro = value;
    }

    get numero(){
        return this.#numero;
    }
    set numero(value){        
        this.#validarNumero(value);
        this.#numero = value;
    }

    get bairro(){
        return this.#bairro;
    }
    set bairro(value){        
        this.#validarBairro(value);
        this.#bairro = value;
    }

    // Validações
    #validarIdEndereco(value){
        if(value && value <= 0){
            throw new Error('Verifique o IdEndereco informado');
        }
    }

    #validarIdCliente(value){
        if(value && value <= 0){
            throw new Error('Verifique o IdCliente informado');
        }
    }

    #validarUf(value) {
        if (!value || value.length !== 2) throw new Error("UF inválida");
    }

    #validarCep(value) {
        if (!/^[0-9]{8}$/.test(value)) 
            throw new Error("CEP inválido");
    }

    #validarCidade(value) {
        if (!value) throw new Error("Cidade obrigatória");
    }

    #validarLogradouro(value) {
        if (!value) throw new Error("Logradouro obrigatório");
    }

    #validarNumero(value) {
        if(!value || isNaN(value)){
            throw new Error('Número obrigatório e deve ser numérico');
        }
    }
    
    #validarBairro(value) {
        if (!value) throw new Error("Bairro obrigatório");
    }

    static criar(dados){
        return new Endereco(
            null,
            dados.uf,
            dados.cep,
            dados.logradouro,
            dados.numero,
            dados.complemento,
            dados.cidade,
            dados.bairro,
            null
        );
    }
}