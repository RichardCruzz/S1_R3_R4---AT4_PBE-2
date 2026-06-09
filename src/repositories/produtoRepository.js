import { connection } from "../configs/Database.js";

const produtoRepository = {

    selecionar: async () => {
        const sql = `
            SELECT *
            FROM produtos;
        `;

        const [rows] = await connection.execute(sql);
        return rows;
    },

    criar: async (produto) => {

        const sql = `
            INSERT INTO produtos
            (idCategoria, NomeProd, Valor, VinculoImg)
            VALUES (?, ?, ?, ?);
        `;

        const values = [
            produto.idCategoria,
            produto.nome,
            produto.valor,
            produto.vinculoImg
        ];

        const [rows] = await connection.execute(
            sql,
            values
        );

        return rows;
    },

    editar: async (produto) => {

        const sql = `
            UPDATE produtos
            SET
                idCategoria=?,
                NomeProd=?,
                Valor=?
            WHERE idProduto=?;
        `;

        const values = [
            produto.idCategoria,
            produto.nome,
            produto.valor,
            produto.id
        ];

        const [rows] = await connection.execute(
            sql,
            values
        );

        return rows;
    },

    deletar: async (id) => {

        const sql = `
            DELETE FROM produtos
            WHERE idProduto = ?;
        `;

        const [rows] = await connection.execute(
            sql,
            [id]
        );

        return rows;
    }
};

export default produtoRepository;