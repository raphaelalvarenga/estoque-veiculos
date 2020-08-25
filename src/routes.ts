import { Router, Request, Response } from "express";
import veiculosController from "./controllers/veiculos-controller";

const router = Router();

router.route("/veiculos")
    .get(async (req: Request, res: Response) => {
        const veiculos = await veiculosController();
        res.json(veiculos);
    });

router.route("/veiculos/:id")
    .get((req: Request, res: Response) => {
        console.log(`Buscar veículo com o id ${req.params.id}`);
        res.json({rota: `/veiculos/${req.params.id}`});
    });

router.route("/veiculos")
    .post((req: Request, res: Response) => {
        console.log("Cadastrar veículo");
        res.json({rota: `/veiculos (cadastrar)`});
    });

router.route("/veiculos/:id")
    .put((req: Request, res: Response) => {
        console.log(`Atualizar o veículo com id ${req.params.id}`);
        res.json({rota: `/veiculos/${req.params.id} (atualizar)`});
    });

router.route("/veiculos/:id")
    .patch((req: Request, res: Response) => {
        console.log(`Atualizar parcialmente o veículo ${req.params.id}`);
        res.json({rota: `/veiculos/${req.params.id} (atualizar parcial)`});
    });

router.route("/veiculos/:id")
    .delete((req: Request, res: Response) => {
        console.log(`Deletar o veículo de id ${req.params.id}`);
        res.json({rota: `/veiculos/${req.params.id} (deletar)`});
    });
export default router;