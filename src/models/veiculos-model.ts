import connection from "../auth/connection";
import Veiculo from "../interfaces/veiculo-interface";

// Todos os models
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

    getUltimosRegistros: async (domingo: string, sabado: string) => {
        const sql = `
            SELECT *
            FROM veiculos
            WHERE created BETWEEN ? AND ?
        `;

        const [rows, fields] = await (await connection).execute(sql, [domingo, sabado]);

        return rows;
    },

    getQuantidadeByMarca: async () => {
        const sql = `
            SELECT marca, COUNT(marca) as qtd
            FROM VEICULOS
            GROUP BY marca
        `;

        const [rows, fields] = await (await connection).execute(sql);

        return rows;
    },

    getQuantidadeByDecada: async () => {
        const sql = `
            SELECT decada, COUNT(*) AS qtd
            FROM (
                SELECT CONCAT(SUBSTR(ano, 1, 3), SUBSTR(ano, 4, 1) - SUBSTR(ano, 4, 1)) AS decada
                FROM veiculos
            ) AS decada
            GROUP BY decada
            ORDER BY decada
        `;

        const [rows, fields] = await (await connection).execute(sql);

        return rows;
    },

    getQuantidadeVendidos: async () => {
        const sql = `
            SELECT
                CASE WHEN vendido = 1 THEN 'Vendidos' ELSE 'Não Vendidos' END AS situacao,
                COUNT(vendido) AS qtd
            FROM veiculos
            GROUP BY vendido
        `;

        const [rows, fields] = await (await connection).execute(sql);

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
    }
}

export default veiculosModel;