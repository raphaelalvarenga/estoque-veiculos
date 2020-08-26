import veiculosModel from "../models/veiculos-model";
import { Request, Response } from "express";
import Veiculo from "../interfaces/veiculo-interface";
import ResponseInterface from "../interfaces/response-interface";

// Variável de retorno
let retorno: ResponseInterface;

// Desestruturando os model
const {
    getTotalVeiculos, getVeiculos, getVeiculoById,
    getQuantidadeByMarca, getQuantidadeByDecada, getQuantidadeVendidos,
    insertVeiculo, putVeiculo, deleteVeiculo
} = veiculosModel;

// Todos os controllers
const veiculosController = {
    getVeiculos: async (req: Request, res: Response) => {
        
        try {
            const totalVeiculos: any = await getTotalVeiculos();
            
            const veiculos: Veiculo[] = await getVeiculos() as Veiculo[];

            retorno = { success: true, message: "", params: { totalVeiculos: totalVeiculos[0].total, veiculos } };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    getVeiculoById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        try {
            const veiculo = await getVeiculoById(id);

            retorno = { success: true, message: "", params: { veiculo } };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    getQuantidadeByMarca: async (req: Request, res: Response) => {
        try {
            const quantidade = await getQuantidadeByMarca();

            retorno = { success: true, message: "", params: {quantidade} };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    getQuantidadeByDecada: async (req: Request, res: Response) => {
        try {
            const quantidade = await getQuantidadeByDecada();

            retorno = { success: true, message: "", params: {quantidade} };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    getQuantidadeVendidos: async (req: Request, res: Response) => {
        try {
            const quantidade = await getQuantidadeVendidos();

            retorno = { success: true, message: "", params: {quantidade} };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    insertVeiculo: async (req: Request, res: Response) => {
        
        try {

            const { veiculo, marca, ano, descricao, vendido } = req.body.params.newVeiculo as Veiculo;

            const newVeiculo: Veiculo = { veiculo, marca, ano, descricao, vendido };

            const newId = await insertVeiculo(newVeiculo);

            retorno = { success: true, message: "", params: { newId: (newId as any).insertId } };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    putVeiculo: async (req: Request, res: Response) => {
        
        try {

            const id = parseInt(req.params.id);
            
            const { veiculo, marca, ano, descricao, vendido } = req.body.params.newVeiculo as Veiculo;

            const newVeiculo: Veiculo = { id, veiculo, marca, ano, descricao, vendido };

            const newId = await putVeiculo(newVeiculo);

            retorno = { success: true, message: "", params: {} };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    patchVeiculo: async (req: Request, res: Response) => {
        console.log(`Atualizar parcialmente o veículo ${req.params.id}`);
        res.json({rota: `/veiculos/${req.params.id} (atualizar parcial)`});
    },

    deleteVeiculo: async (req: Request, res: Response) => {

        try {

            const id = parseInt(req.params.id);
            
            const newId = await deleteVeiculo(id);

            retorno = { success: true, message: "", params: {} };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    }
}

export default veiculosController;