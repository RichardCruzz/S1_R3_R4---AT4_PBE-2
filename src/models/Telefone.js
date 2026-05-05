export class Telefone {
    #idTelefone;
    #idCliente;
    #telefone;


    constructor( pIdCliente, pTelefone, pIdTelefone){
        this.idTelefone = pIdTelefone;
        this.idCliente = pIdCliente;
        this.telefone = pTelefone;
    }

    //Métodos acessores - GETTERS e SETTERS
    get idTelefone (){
        return this.#idTelefone;
    }
    set idTelefone(value){
        this.#validarIdTelefone(value);
        this.#idTelefone = value;
    }

    get idCliente (){
        return this.#idCliente;
    }

    set idCliente(value){
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    get telefone(){
        return this.#telefone;
    }
    set telefone(value){        
        this.#validarTelefone(value);
        this.#telefone = value;
    }

    //Métodos auxiliares
    #validarIdTelefone(value){
        if(value && value <= 0){
            throw new Error('Verifique o Id informado');
        }
    }
    #validarIdCliente(value){
        if(value && value <= 0){
            throw new Error('Verifique o Id informado');
        }
    }
    #validarTelefone(value){
        if(!value || isNaN(value)){
            throw new Error('O campo telefone é obrigatória e deve ser um número válido');
        }
    }

    static criar(dados){
        console.log( dados.idCliente, dados.telefone, dados.idTelefone );
        
        return new Telefone( dados.idCliente, dados.telefone, null);
    }

}