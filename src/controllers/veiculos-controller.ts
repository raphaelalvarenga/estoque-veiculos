import veiculosModel from "../models/veiculos-model";
import { Request, Response } from "express";
import Veiculo from "../interfaces/veiculo-interface";
import ResponseInterface from "../interfaces/response-interface";

let retorno: ResponseInterface;

const veiculosController = {
    getVeiculos: async (req: Request, res: Response) => {
        
        try {
            const totalVeiculos: any = await veiculosModel.getTotalVeiculos();
            
            const veiculos: Veiculo[] = await veiculosModel.getVeiculos() as Veiculo[];

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
            const veiculo = await veiculosModel.getVeiculoById(id);

            retorno = { success: true, message: "", params: { veiculo } };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    getQuantidadeByMarca: async (req: Request, res: Response) => {
        try {
            const quantidade = await veiculosModel.getQuantidadeByMarca();

            retorno = { success: true, message: "", params: {quantidade} };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    getQuantidadeByDecada: async (req: Request, res: Response) => {
        try {
            const quantidade = await veiculosModel.getQuantidadeByDecada();

            retorno = { success: true, message: "", params: {quantidade} };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    getQuantidadeVendidos: async (req: Request, res: Response) => {
        try {
            const quantidade = await veiculosModel.getQuantidadeVendidos();

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

            const newId = await veiculosModel.insertVeiculo(newVeiculo);

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

            const newId = await veiculosModel.putVeiculo(newVeiculo);

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
            
            const newId = await veiculosModel.deleteVeiculo(id);

            retorno = { success: true, message: "", params: {} };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    }
}

export default veiculosController;