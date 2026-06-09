import { connection } from "../configs/Database.js";

const pedidoRepository = {

    selecionar: async (idCliente) => {
        const conn = await connection.getConnection();

        try {
            const sql = `
                SELECT
                    p.PedidoId,
                    p.ClienteId,
                    p.subTotal,
                    p.status,
                    ip.ProdutoId,
                    ip.Quantidade,
                    ip.ValorItem
                FROM pedidos p
                INNER JOIN itens_pedidos ip
                    ON p.PedidoId = ip.PedidoId
                WHERE p.ClienteId = ?;
            `;

            const [rows] = await conn.execute(sql, [
                idCliente
            ]);

            return rows;

        } finally {
            conn.release();
        }
    },

    criar: async (pedido, itens) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const sqlPed = `
                INSERT INTO pedidos
                (ClienteId, subTotal, status)
                VALUES (?, ?, ?);
            `;

            const [resultPed] = await conn.execute(sqlPed, [
                pedido.clienteId,
                pedido.subTotal,
                pedido.status
            ]);

            const pedidoId = resultPed.insertId;

            for (const item of itens) {
                const sqlItens = `
                    INSERT INTO itens_pedidos
                    (PedidoId, ProdutoId, Quantidade, ValorItem)
                    VALUES (?, ?, ?, ?);
                `;

                await conn.execute(sqlItens, [
                    pedidoId,
                    item.produtoId,
                    item.quantidade,
                    item.valorItem
                ]);
            }

            await conn.commit();

            return {
                pedidoId
            };

        } catch (error) {
            await conn.rollback();
            throw error;

        } finally {
            conn.release();
        }
    },

    editar: async (pedido) => {
        const conn = await connection.getConnection();

        try {
            const sql = `
                UPDATE pedidos
                SET status = ?
                WHERE PedidoId = ?;
            `;

            const [rows] = await conn.execute(sql, [
                pedido.status,
                pedido.idPedido
            ]);

            return rows;

        } finally {
            conn.release();
        }
    },

    deletar: async (idPedido) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            await conn.execute(`
                DELETE FROM itens_pedidos
                WHERE PedidoId = ?;
            `, [idPedido]);

            const [rows] = await conn.execute(`
                DELETE FROM pedidos
                WHERE PedidoId = ?;
            `, [idPedido]);

            await conn.commit();

            return rows;

        } catch (error) {
            await conn.rollback();
            throw error;

        } finally {
            conn.release();
        }
    }
};

export default pedidoRepository;