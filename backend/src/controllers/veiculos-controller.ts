import veiculosModel from "../models/veiculos-model";
import { Request, Response } from "express";
import Veiculo from "../interfaces/veiculo-interface";
import ResponseInterface from "../interfaces/response-interface";
import NovoVeiculo from "../interfaces/novo-veiculo-interface";
import MarcaInterface from "../interfaces/marca-interface";
import ModeloInterface from "../interfaces/modelo-interface";

// Variável de retorno
let retorno: ResponseInterface;

// Desestruturando os model
const {
    getVeiculosNaoVendidos, getVeiculos, getVeiculoById,
    getQuantidadeByMarca, getQuantidadeByDecada, getQuantidadeVendidos,
    insertVeiculo, putVeiculo, deleteVeiculo, getUltimosRegistros,
    getMarcas, getModelos
} = veiculosModel;

// Todos os controllers
const veiculosController = {
    getVeiculos: async (req: Request, res: Response) => {
        
        try {
            const totalVeiculos: any = await getVeiculosNaoVendidos();
            
            const veiculos: Veiculo[] = await getVeiculos() as Veiculo[];

            retorno = { success: true, message: "", params: { totalVeiculos: totalVeiculos[0].total, veiculos } };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    getVeiculoById: async (req: Request, res: Response) => {
        const idVeiculo = parseInt(req.params.idVeiculo);

        try {
            const veiculo: any = await getVeiculoById(idVeiculo);
            const marcas = await getMarcas();
            const modelos = await getModelos(veiculo[0].idMarca);

            retorno = { success: true, message: "", params: { veiculo, marcas, modelos } };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    getMarcas: async (req: Request, res: Response) => {
        
        try {
            const marcas: MarcaInterface[] = await getMarcas();

            retorno = { success: true, message: "", params: { marcas } };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    getModelos: async (req: Request, res: Response) => {
        try {
            const idMarca = parseInt(req.query.p?.toString()!);
            const modelos: ModeloInterface[] = await getModelos(idMarca);

            retorno = { success: true, message: "", params: { modelos } };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    },

    getUltimosRegistros: async (req: Request, res: Response) => {

        try {
            const d = new Date();

            // Domingo da última semana
            let domingo: Date | string = new Date((d.getTime() - (d.getDay() * 86400000)) - 7 * 86400000);

            // Sábado da última semana
            let sabado: Date | string = new Date(domingo.getTime() + (6 * 86400000));

            domingo = `${domingo.getFullYear()}-${domingo.getMonth() + 1}-${domingo.getDate()}`;
            sabado = `${sabado.getFullYear()}-${sabado.getMonth() + 1}-${sabado.getDate()}`;

            const veiculos = await getUltimosRegistros(domingo, sabado);

            retorno = { success: true, message: "", params: { veiculos } };
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

            const { idMarca, idModelo, ano, descricao, vendido } = req.body.params.newVeiculo as NovoVeiculo;

            const newVeiculo: NovoVeiculo = { idMarca, idModelo, ano, descricao, vendido };

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

            const idVeiculo = parseInt(req.params.idVeiculo);
            
            const { idMarca, idModelo, ano, descricao, vendido } = req.body.params.newVeiculo as NovoVeiculo;

            const newVeiculo: NovoVeiculo = { idVeiculo, idMarca, idModelo, ano, descricao, vendido };

            await putVeiculo(newVeiculo);

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

            const idVeiculo = parseInt(req.params.idVeiculo);
            
            await deleteVeiculo(idVeiculo);

            retorno = { success: true, message: "", params: {} };
        }

        catch (erro) {
            retorno = { success: false, message: erro, params: {} };
        }

        res.json(retorno);
    }
}

export default veiculosController;