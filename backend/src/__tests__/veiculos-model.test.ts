import axios from "axios";
import dotenv from "dotenv";
import ResponseInterface from "../interfaces/response-interface";

dotenv.config();

test("Verifica se a busca de veículos retorna um ou mais registros", async () => {
    return await axios
            .get(`http://localhost:${process.env.PORT}/veiculos`)
            .then(res => {
                expect((res.data as ResponseInterface).params.veiculos.length).toBeGreaterThanOrEqual(1)
            })
})

test("Verifica a busca de um veículo pelo ID", async () => {
    return await axios
            .get(`http://localhost:${process.env.PORT}/veiculos/4`)
            .then(res => {
                expect((res.data as ResponseInterface).success).toBeTruthy()
            })
})