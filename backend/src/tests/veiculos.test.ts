import veiculosModel from "../models/veiculos-model";

test("A busca de veículos precisa que success seja true", () => {
    veiculosModel.getVeiculos().then((data: any) => {
        expect(data.success).toBeTruthy();
    })
})

test("A busca de veículo por ID precisa que success seja true", () => {
    veiculosModel.getVeiculoById(30).then((data: any) => {
        expect(data.success).toBeTruthy();
    })
})