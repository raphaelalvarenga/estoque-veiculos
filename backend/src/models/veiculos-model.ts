import connection from "../auth/connection";
import NovoVeiculo from "../interfaces/novo-veiculo-interface";
import MarcaInterface from "../interfaces/marca-interface";
import ModeloInterface from "../interfaces/modelo-interface";

// Todos os models
const veiculosModel = {

    getVeiculosNaoVendidos: async () => {
        const sql = "SELECT COUNT(*) as total FROM veiculos WHERE vendido = 0";

        const [rows, fields] = await (await connection).execute(sql);

        return rows;
    },

    getVeiculos: async () => {
        const sql = `
            SELECT
                v.idVeiculo,
                ma.nome as marca,
                mo.nome as modelo,
                v.ano,
                v.descricao,
                v.vendido,
                DATE_FORMAT(v.created, '%d/%m/%Y') as created,
                DATE_FORMAT(v.updated, '%d/%m/%Y') as updated
            FROM veiculos v
            INNER JOIN marcas ma
            ON v.idMarca = ma.idMarca
            INNER JOIN modelos mo
            ON v.idModelo = mo.idModelo
            ORDER BY created DESC
        `;
        
        const [rows, fields] = await (await connection).execute(sql);
        
        return rows;
    },

    getVeiculoById: async (idVeiculo: number) => {
        const sql = `
            SELECT
                idVeiculo,
                idMarca,
                idModelo,
                ano,
                descricao,
                vendido,
                DATE_FORMAT(created, '%d/%m/%Y') as created,
                DATE_FORMAT(updated, '%d/%m/%Y') as updated
            FROM veiculos
            WHERE idVeiculo = ?
        `;

        const [rows, fields] = await (await connection).execute(sql, [idVeiculo]);

        return rows;
    },

    getUltimosRegistros: async (domingo: string, sabado: string) => {
        const sql = `
            SELECT
                v.idVeiculo,
                ma.nome AS marca,
                mo.nome AS modelo,
                v.ano,
                v.descricao,
                v.vendido,
                DATE_FORMAT(created, '%d/%m/%y') AS created
            FROM veiculos v
            INNER JOIN marcas ma
            ON v.idMarca = ma.idMarca
            INNER JOIN modelos mo
            ON v.idModelo = mo.idModelo
            WHERE v.created BETWEEN ? AND ?
            ORDER BY created
        `;

        const [rows, fields] = await (await connection).execute(sql, [domingo, sabado]);

        return rows;
    },

    getMarcas: async (): Promise<MarcaInterface[]> => {
        const sql = `SELECT * FROM marcas`;

        const [rows, fields] = await (await connection).execute(sql);

        return rows as MarcaInterface[];
    },

    getModelos: async (idMarca: number): Promise<ModeloInterface[]> => {
        const sql = `
            SELECT *
            FROM modelos
            WHERE idMarca = ?
        `;

        const [rows, fields] = await (await connection).query(sql, idMarca);

        return rows as ModeloInterface[];
    },

    getQuantidadeByMarca: async () => {
        const sql = `
            SELECT
                ma.nome, COUNT(ma.nome) as qtd
            FROM veiculos as v
            INNER JOIN marcas as ma
            ON v.idMarca = ma.idMarca
            GROUP BY ma.nome
            ORDER BY ma.nome
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

    insertVeiculo: async (newVeiculo: NovoVeiculo) => {
        const { idMarca, idModelo, ano, descricao, vendido } = newVeiculo;

        const sql = `
            INSERT INTO veiculos
            (idVeiculo, idMarca, idModelo, ano, descricao, vendido, created)
            VALUES
            (DEFAULT, ?, ?, ?, ?, ?, SYSDATE())
        `;

        const [rows, fields] = await (await connection).query(sql, [idMarca, idModelo, ano, descricao, vendido]);

        return rows;
    },

    putVeiculo: async (newVeiculo: NovoVeiculo) => {
        const { idVeiculo, idMarca, idModelo, ano, descricao, vendido } = newVeiculo;

        const sql = `
            UPDATE veiculos
            SET idMarca = ?, idModelo = ?, ano = ?, descricao = ?, vendido = ?, updated = SYSDATE()
            WHERE idVeiculo = ?
        `;

        const [rows, fields] = await (await connection).query(sql, [idMarca, idModelo, ano, descricao, vendido, idVeiculo]);

        return rows;
    },

    deleteVeiculo: async (idVeiculo: number) => {

        const sql = `
            DELETE FROM veiculos
            WHERE idVeiculo = ?
        `;

        const [rows, fields] = await (await connection).query(sql, [idVeiculo]);

        return rows;
    }
}

export default veiculosModel;