export class Pedido{
    #id;
    #clienteId;
    #subTotal;
    #status;
    #dataCad;

    constructor(pClienteId, pSubTotal, pStatus, pId){
        this.#clienteId = pClienteId;
        this.#subTotal = pSubTotal;
        this.#status = pStatus;
        this.#id = pId;
    }

    //GETTERS
    get id(){
        return this.#id;
    }
    get clienteId(){
        return this.#clienteId;
    }
    get subTotal(){
        return this.#subTotal;
    }
    get status(){
        return this.#status;
    }

    //SETTERS
    set id(value){
        this.#validarId(value);
        this.#id=value;
    }
    set clienteId(value){
        this.#validarClienteId(value);
        this.#clienteId=value;
    }
    set subTotal(value){
        this.#validarSubTotal(value);
        this.#subTotal=value;
    }

    #validarId(value){
        if(value && value <= 0){
            throw new Error("Verificar o ID informado");
        }
    }
    #validarClienteId(value){
        if(value && value <= 0){
            throw new Error("Verificar o ID cliente informado");
        }
    }
    #validarSubTotal(value){
        if(value && value <= 0){
            throw new Error("Não foi possível obter o subtotal");
        }
    }

    static criar(dados){
        return new Pedido(dados.clienteId, dados.subTotal, dados.status, null);
    }
    static editar(dados, id){
        return new Pedido(dados.clienteId, dados.subTotal, dados.status, id);
    }
}