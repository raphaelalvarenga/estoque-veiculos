import ResponseInterface from "../interfaces/response-interface";
import Veiculo from "../interfaces/veiculo-interface";

const services = {
    getVeiculos: async (): Promise<Veiculo[]> => {
        const req = await fetch("http://localhost:5000/veiculos")
        const res: ResponseInterface = await req.json();

        return res.params.veiculos as Veiculo[];
    }
}

export default services;