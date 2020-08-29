import { Router, Request, Response } from "express";
import veiculosController from "./controllers/veiculos-controller";

const router = Router();

const {
        getVeiculos, getVeiculoById, getQuantidadeByMarca,
        getQuantidadeByDecada, getQuantidadeVendidos,
        insertVeiculo, putVeiculo, patchVeiculo,
        deleteVeiculo, getUltimosRegistros, getMarcas,
        getModelos, getEstatisticas
} = veiculosController;

router.route("/veiculos").get(getVeiculos);

router.route("/veiculos/find").get((req: Request, res: Response) => {
        switch (req.query.q) {
                case "marcas":
                        getMarcas(req, res);
                        break;

                case "modelos":
                        getModelos(req, res);
                        break;

                case "quantidadeMarcas":
                        getQuantidadeByMarca(req, res);
                        break;
                
                case "quantidadeDecadas":
                        getQuantidadeByDecada(req, res);
                        break;
                
                case "quantidadeVendidos":
                        getQuantidadeVendidos(req, res);
                        break;

                case "ultimosRegistros":
                        getUltimosRegistros(req, res);
                        break;

                case "estatisticas":
                        getEstatisticas(req, res);
                        break;

                default: break;
        }
});

router.route("/veiculos/:idVeiculo").get(getVeiculoById);

router.route("/veiculos").post(insertVeiculo);

router.route("/veiculos/:idVeiculo").put(putVeiculo);

router.route("/veiculos/:idVeiculo").patch(patchVeiculo);

router.route("/veiculos/:idVeiculo").delete(deleteVeiculo);

export default router;