import { connection } from "../configs/Database.js";

const produtoRepository = {
    selecionar: async () => {
         const sql = 'SELECT * FROM produtos;';
         const [rows] = await connection.execute(sql);
         return rows;
     },
    criar: async (produto) => {
        console.log(produto.idCategoria, produto.nome, produto.valor, produto.vinculoImg );
        
        const sql = 'INSERT INTO produtos (idCategoria, NomeProd, Valor, VinculoImg ) VALUES (?,?,?,?);';
        const values = [produto.idCategoria, produto.nome, produto.valor, produto.vinculoImg ];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },
    editar: async (produto) => {
        console.log(produto.idCategoria, produto.nome, produto.valor, produto.vinculoImg , produto.id);
        
        const sql = 'UPDATE produtos SET idCategoria=?, NomeProd=?, Valor=? WHERE id=?;';
        const values = [produto.idCategoria, produto.nome, produto.valor , produto.id];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },
    deletar: async (id) => {
        const sql = 'DELETE FROM produtos WHERE Id = ?;';
        const values = [id];
        const [rows] = await connection.execute(sql, values);
        return rows;                                                         
    },           

}

export default produtoRepository;