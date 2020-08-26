import { Router, Request, Response } from "express";
import veiculosController from "./controllers/veiculos-controller";

const router = Router();

const {
        getVeiculos, getVeiculoById, getQuantidadeByMarca,
        getQuantidadeByDecada, getQuantidadeVendidos,
        insertVeiculo, putVeiculo, patchVeiculo,
        deleteVeiculo
} = veiculosController;

router.route("/veiculos").get(getVeiculos);

router.route("/veiculos/:id").get(getVeiculoById);

router.route("/veiculos").post(insertVeiculo);

router.route("/veiculos/:id").put(putVeiculo);

router.route("/veiculos/:id").patch(patchVeiculo);

router.route("/veiculos/:id").delete(deleteVeiculo);

export default router;