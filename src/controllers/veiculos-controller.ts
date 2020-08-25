import veiculosModel from "../models/veiculos-model";

const veiculosController = async () => {
    return await veiculosModel();
}

export default veiculosController;