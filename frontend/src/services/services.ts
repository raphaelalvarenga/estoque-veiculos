import ResponseInterface from "../interfaces/response-interface";
import Veiculo from "../interfaces/veiculo-interface";
import NovoVeiculo from "../interfaces/novo-veiculo-interface";
import BodyRequestInterface from "../interfaces/request-interface";

const services = {
    getVeiculos: async (): Promise<Veiculo[]> => {
        const req = await fetch("http://localhost:5000/veiculos")
        const res: ResponseInterface = await req.json();

        return res.params.veiculos as Veiculo[];
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

        const req = await fetch("http://localhost:5000/veiculos", {
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