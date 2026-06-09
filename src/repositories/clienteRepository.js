import { connection } from "../configs/Database.js";

const clienteRepository = {

    selecionar: async () => {
        const sql = `
            SELECT *
            FROM clientes c
            LEFT JOIN telefones t ON c.idCliente = t.idCliente
            LEFT JOIN enderecos e ON c.idCliente = e.idCliente;
        `;

        const [rows] = await connection.execute(sql);
        return rows;
    },

    criar: async (cliente, endereco, telefone) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const sqlCliente = `
                INSERT INTO clientes (nome, cpf)
                VALUES (?, ?);
            `;

            const [rowsClientes] = await conn.execute(sqlCliente, [
                cliente.nome,
                cliente.cpf
            ]);

            const idCliente = rowsClientes.insertId;

            const sqlTelefone = `
                INSERT INTO telefones (telefone, idCliente)
                VALUES (?, ?);
            `;

            const [rowsTelefone] = await conn.execute(sqlTelefone, [
                telefone.telefone,
                idCliente
            ]);

            const sqlEndereco = `
                INSERT INTO enderecos
                (logradouro, numero, complemento, bairro, cidade, uf, cep, idCliente)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `;

            const valuesEndereco = [
                endereco.logradouro,
                endereco.numero,
                endereco.complemento ?? null,
                endereco.bairro,
                endereco.cidade,
                endereco.uf,
                endereco.cep,
                idCliente
            ];

            const [rowsEnderecos] = await conn.execute(
                sqlEndereco,
                valuesEndereco
            );

            await conn.commit();

            return {
                rowsClientes,
                rowsEnderecos,
                rowsTelefone
            };

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
                SET nome=?, cpf=?
                WHERE idCliente=?;
            `;

            await conn.execute(sqlCliente, [
                cliente.nome ?? null,
                cliente.cpf ?? null,
                cliente.idCliente
            ]);

            if (telefone) {
                const sqlTelefone = `
                    UPDATE telefones
                    SET telefone=?
                    WHERE idCliente=?;
                `;

                await conn.execute(sqlTelefone, [
                    telefone,
                    cliente.idCliente
                ]);
            }

            if (endereco) {
                const sqlEndereco = `
                    UPDATE enderecos
                    SET
                        logradouro=?,
                        numero=?,
                        complemento=?,
                        bairro=?,
                        cidade=?,
                        uf=?,
                        cep=?
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

            return {
                message: 'Cliente atualizado com sucesso!'
            };

        } catch (error) {
            await conn.rollback();
            throw error;

        } finally {
            conn.release();
        }
    },

    deletar: async (idCliente) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            await conn.execute(
                'DELETE FROM telefones WHERE idCliente = ?',
                [idCliente]
            );

            await conn.execute(
                'DELETE FROM enderecos WHERE idCliente = ?',
                [idCliente]
            );

            await conn.execute(
                'DELETE FROM clientes WHERE idCliente = ?',
                [idCliente]
            );

            await conn.commit();

            return {
                message: "Cliente deletado com sucesso!"
            };

        } catch (error) {
            await conn.rollback();
            throw error;

        } finally {
            conn.release();
        }
    }
};

export default clienteRepository;