import veiculosModel from "../models/veiculos-model";
import Veiculo from "../interfaces/veiculo-interface";

test("Testa se a busca de veículos funciona", async () => {
    const veiculos = await veiculosModel.getVeiculos() as Veiculo[];
    return expect(veiculos.length).toBeGreaterThanOrEqual(1)
})