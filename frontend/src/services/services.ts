import ResponseInterface from "../interfaces/response-interface";
import Veiculo from "../interfaces/veiculo-interface";
import NovoVeiculo from "../interfaces/novo-veiculo-interface";
import BodyRequestInterface from "../interfaces/request-interface";
import config from "../assets/config";

const services = {
    getVeiculos: async (): Promise<Veiculo[]> => {
        const req = await fetch(`${config.endpoint}veiculos`)
        const res: ResponseInterface = await req.json();

        return res.params.veiculos as Veiculo[];
    },

    getDados: async (param: string): Promise<ResponseInterface> => {
                
        const req = await fetch(`${config.endpoint}veiculos/find?${param}`);
        const res: ResponseInterface = await req.json();

        return res;
    },

    insertVeiculo: async (novoVeiculo: NovoVeiculo): Promise<number> => {

        const bodyRequest: BodyRequestInterface = {
            idLogin: 1,
            action: "insertVeiculo",
            token: "gfgfsdgfdsgfd",
            params: {
                "newVeiculo": novoVeiculo
            }
        }

        const req = await fetch(`${config.endpoint}veiculos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyRequest)
        });

        const res: ResponseInterface = await req.json();

        return res.params.newId as number;
    }
}

export default services;