export class ItensPedido{
    #id;
    #pedidoId;
    #produtoId;
    #quantidade;
    #valorItem;

    //CONSTRUTOR
    constructor(pProdutoId, pQuantidade, pValorItem, pId, pPedidoId){
        this.#produtoId = pProdutoId;
        this.#quantidade = pQuantidade;
        this.#valorItem = pValorItem;
        this.#id = pId;
        this.#pedidoId = pPedidoId;
    }

    //GETTERS
    get id(){
        return this.#id;
    }
    get pedidoId(){
        return this.#pedidoId;
    }
    get produtoId(){
        return this.#produtoId;
    }
    get quantidade(){
        return this.#quantidade;
    }
    get valorItem(){
        return this.#valorItem;
    }

    //SETTERS
    set id(value){
        this.#validarId(value);
        this.#id=value;
    }
    set pedidoId(value){
        this.#validarPedidoId(value);
        this.#pedidoId=value;
    }
    set produtoId(value){
        this.#validarProdutoId(value);
        this.#produtoId=value;
    }
    set quantidade(value){
        this.#validarQuantidade(value);
        this.#quantidade=value;
    }
    set valorItem(value){
        this.#validarValorItem(value);
        this.#valorItem=value;
    }

    //MÉTODOS AUXILIARES
    #validarId(value){
        if(value && value <= 0){
            throw new Error("Verificar o ID informado");
        }
    }
    #validarPedidoId(value){
        if(!value && value <= 0){
            throw new Error("Verificar o ID pedido informado");
        }
    }
    #validarProdutoId(value){
        if(!value || value <= 0){
            throw new Error("Verificar o ID produto informado");
        }
    }
    #validarQuantidade(value){
        if(!value || value <= 0){
            throw new Error("Não foi possível obter a quantidade");
        }
    }
    #validarValorItem(value){
        if(!value || value <= 0){
            throw new Error("Informe um valor para o item");
        }
    }
    static calcularSubTotalItens(itens){
        return (itens.reduce(
            (total, item) => total + (item.valorItem * item.quantidade), 0
        ));
    }

    static criar(dados){
        return new ItensPedido(dados.produtoId, dados.quantidade, dados.valorItem, null, null);
    }
    static criar(dados, id){
        return new ItensPedido(dados.produtoId, dados.quantidade, dados.valorItem, id, dados.pedidoId);
    }
}