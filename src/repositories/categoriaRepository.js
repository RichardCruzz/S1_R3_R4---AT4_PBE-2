import { connection } from "../configs/Database.js";

const categoriaRepository = {

    selecionar: async () => {
        const sql = `
            SELECT *
            FROM categorias;
        `;

        const [rows] = await connection.execute(sql);
        return rows;
    },

    criar: async (categoria) => {

        const sql = `
            INSERT INTO categorias
            (nome, descricao)
            VALUES (?, ?);
        `;

        const values = [
            categoria.nome,
            categoria.descricao ?? null
        ];

        const [rows] = await connection.execute(
            sql,
            values
        );

        return rows;
    },

    editar: async (categoria) => {

        const sql = `
            UPDATE categorias
            SET
                nome = ?,
                descricao = ?
            WHERE idCategoria = ?;
        `;

        const values = [
            categoria.nome,
            categoria.descricao ?? null,
            categoria.id
        ];

        const [rows] = await connection.execute(
            sql,
            values
        );

        return rows;
    },

    deletar: async (id) => {

        const sql = `
            DELETE FROM categorias
            WHERE idCategoria = ?;
        `;

        const [rows] = await connection.execute(
            sql,
            [id]
        );

        return rows;
    }
};

export default categoriaRepository;