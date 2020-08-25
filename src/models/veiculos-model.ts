import connection from "../auth/connection";

const veiculosModel = async () => {
    const sql = "SELECT * FROM veiculos";
    
    const [rows, fields] = await (await connection).execute(sql);

    return rows;
}

export default veiculosModel;