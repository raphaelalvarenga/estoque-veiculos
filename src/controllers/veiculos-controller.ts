import veiculosModel from "../models/veiculos-model";
import { Request, Response } from "express";
import Veiculo from "../interfaces/veiculo-interface";
import ResponseInterface from "../interfaces/response-interface";

let retorno: ResponseInterface;

const veiculosController = {
    getVeiculos: async (req: Request, res: Response) => {
        let veiculos: Veiculo[];
        
        try {
            veiculos = await veiculosModel() as Veiculo[];

            retorno = { success: true, message: "", params: { veiculos } };
        }

        catch (erro) {
            retorno = { success: false, message: erro.getMessage(), params: {} };
        }

        res.json(retorno);
    },

    getVeiculoById: async (req: Request, res: Response) => {
        console.log(`Buscar veículo com o id ${req.params.id}`);
        res.json({rota: `/veiculos/${req.params.id}`});
    },

    insertVeiculo: async (req: Request, res: Response) => {
        console.log("Cadastrar veículo");
        res.json({rota: `/veiculos (cadastrar)`});
    },

    putVeiculo: async (req: Request, res: Response) => {
        console.log(`Atualizar o veículo com id ${req.params.id}`);
        res.json({rota: `/veiculos/${req.params.id} (atualizar)`});
    },

    patchVeiculo: async (req: Request, res: Response) => {
        console.log(`Atualizar parcialmente o veículo ${req.params.id}`);
        res.json({rota: `/veiculos/${req.params.id} (atualizar parcial)`});
    },

    deleteVeiculo: async (req: Request, res: Response) => {
        console.log(`Deletar o veículo de id ${req.params.id}`);
        res.json({rota: `/veiculos/${req.params.id} (deletar)`});
    }
}

export default veiculosController;