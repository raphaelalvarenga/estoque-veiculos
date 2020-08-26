import connection from "../auth/connection";
import Veiculo from "../interfaces/veiculo-interface";

const veiculosModel = {

    getTotalVeiculos: async () => {
        const sql = "SELECT COUNT(*) as total FROM veiculos WHERE vendido = 0";

        const [rows, fields] = await (await connection).execute(sql);

        return rows;
    },

    getVeiculos: async () => {
        const sql = "SELECT * FROM veiculos";
        
        const [rows, fields] = await (await connection).execute(sql);
        
        return rows;
    },

    getVeiculoById: async (id: number) => {
        const sql = "SELECT * FROM veiculos WHERE id = ?";

        const [rows, fields] = await (await connection).execute(sql, [id]);

        return rows;
    },

    insertVeiculo: async (newVeiculo: Veiculo) => {
        const { veiculo, marca, ano, descricao, vendido } = newVeiculo;

        const sql = `
            INSERT INTO veiculos
            (id, veiculo, marca, ano, descricao, vendido, created)
            VALUES
            (DEFAULT, ?, ?, ?, ?, ?, SYSDATE())
        `;

        const [rows, fields] = await (await connection).query(sql, [veiculo, marca, ano, descricao, vendido ? 1 : 0]);

        return rows;
    },

    putVeiculo: async (newVeiculo: Veiculo) => {
        const { id, veiculo, marca, ano, descricao, vendido } = newVeiculo;

        const sql = `
            UPDATE veiculos
            SET veiculo = ?, marca = ?, ano = ?, descricao = ?, vendido = ?, updated = SYSDATE()
            WHERE id = ?
        `;

        const [rows, fields] = await (await connection).query(sql, [veiculo, marca, ano, descricao, vendido ? 1 : 0, id]);

        return rows;
    },

    deleteVeiculo: async (id: number) => {

        const sql = `
            DELETE FROM veiculos
            WHERE id = ?
        `;

        const [rows, fields] = await (await connection).query(sql, [id]);

        return rows;
    },
}

export default veiculosModel;