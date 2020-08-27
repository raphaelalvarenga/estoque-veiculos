import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "../routes";

export default class App {

    // Esta variável vai ser responsável por todo o trabalho do express
    private server: Application;

    // Quando o servidor inicia, ele precisa configurar porta, cors, rotas, etc
    constructor(private port?: number | string) {
        this.server = express();
        this.settings();
        this.routes();
    }

    public settings() {
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(bodyParser.json());
        this.server.use(cors());
        this.server.set("port", process.env.PORT || this.port || 5000);
    }

    public routes() {
        this.server.use(router);
    }

    public listen() {
        this.server.listen(this.server.get("port"), () => console.log(`Port ${this.server.get("port")} running...`));
    }
}