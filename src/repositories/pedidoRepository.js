import { connection } from "../configs/Database.js";

const pedidoRepository = {

    selecionar: async (idCliente) => {
        const conn = await connection.getConnection();
        try {
            const sql = `
                SELECT *
                FROM clientes c
                INNER JOIN telefones t ON c.idCliente = t.idCliente
                INNER JOIN enderecos e ON c.idCliente = e.idCliente
                WHERE c.idCliente = ?;
            `;

            const [rows] = await conn.execute(sql, [idCliente]);
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
                INSERT INTO pedidos (ClienteId, subTotal, status)
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
            return { pedidoId };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    editar: async (cliente, endereco, telefone) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();

            const sqlCliente = `
                UPDATE clientes
                SET nome = ?, cpf = ?
                WHERE idCliente = ?;
            `;

            await conn.execute(sqlCliente, [
                cliente.nome ?? null,
                cliente.cpf ?? null,
                cliente.idCliente
            ]);

            if (telefone?.telefone) {
                const sqlTelefone = `
                    UPDATE telefones
                    SET telefone = ?
                    WHERE idCliente = ?;
                `;

                await conn.execute(sqlTelefone, [
                    telefone.telefone,
                    cliente.idCliente
                ]);
            }

            if (endereco) {
                const sqlEndereco = `
                    UPDATE enderecos
                    SET logradouro=?, numero=?, complemento=?, bairro=?, cidade=?, uf=?, cep=?
                    WHERE idCliente=?;
                `;

                await conn.execute(sqlEndereco, [
                    endereco.logradouro ?? null,
                    endereco.numero ?? null,
                    endereco.complemento ?? null,
                    endereco.bairro ?? null,
                    endereco.cidade ?? null,
                    endereco.uf ?? null,
                    endereco.cep ?? null,
                    cliente.idCliente
                ]);
            }

            await conn.commit();
            return { message: 'Cliente atualizado com sucesso!' };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    }
};

export default pedidoRepository;