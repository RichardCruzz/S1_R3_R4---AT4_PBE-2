export class Produto {
    #id;
    #idCategoria;
    #nome;
    #valor;
    #vinculoImg
    #dataCad;

    constructor(pIdCategoria, pNome, pValor, pvinculoImg, pId){
        this.idCategoria = pIdCategoria;
        this.nome = pNome;
        this.valor = pValor;
        this.vinculoImg = pvinculoImg;
        this.id = pId;
    }

    //Métodos acessores - GETTERS e SETTERS
    get id (){
        return this.#id;
    }
    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    get idCategoria (){
        return this.#idCategoria;
    }

    set idCategoria(value){
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }
    
    get nome (){
        return this.#nome;
    }

    set nome(value){
        this.#validarNome(value);
        this.#nome = value;
    }

    get valor(){
        return this.#valor;
    }
    set valor(value){        
        this.#validarValor(value);
        this.#valor = value;
    }

    get vinculoImg(){
        return this.#vinculoImg;
    }
    set vinculoImg(value){
        this.#validarPathImagem(value);
        this.#vinculoImg = value;
    }

    //Métodos auxiliares
    #validarId(value){
        if(value && value <= 0){
            throw new Error('Verifique o Id informado');
        }
    }
    #validarIdCategoria(value){
        if(value && value <= 0){
            throw new Error('Verifique o Id informado');
        }
    }
    #validarNome(value){
        if(!value || value.trim().length < 3 || value.trim().length > 45){
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }
    #validarValor(value){
        if(!value || isNaN(value)){
            throw new Error('O campo valor é obrigatória e deve ser um número válido');
        }
    }
    #validarPathImagem(value){
        if(value && (value.trim().length < 5 || value.trim().length > 250)){
            throw new Error('O campo image é obrigatório e deve ter entre 3 e 250 caracteres');
        }
    }
    static criar(dados){
        console.log(dados.idCategoria, dados.nome, dados.valor, dados.vinculoImg);
        
        return new Produto(dados.idCategoria, dados.nome, dados.valor, dados.vinculoImg, null);
    }
    static alterar(dados, id){        
        return new Produto(dados.idCategoria, dados.nome, dados.valor, null, id);
    }
}