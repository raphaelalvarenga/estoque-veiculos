import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Veiculo from "../interfaces/veiculo-interface";
import CardVeiculo from "../components/CardVeiculo";

const Home: React.FunctionComponent = () => {
    

    const [veiculos, setVeiculos] = useState<Veiculo[]>([
        {
            id: 2,
            veiculo: "Fiesta",
            marca: "Ford",
            ano: 2010,
            descricao: "Carro em boas condições",
            vendido: 0,
            created: "2020-08-25 19:57:37",
            updated: ""
        },
        {
            id: 4,
            veiculo: "Civic",
            marca: "Honda",
            ano: 2015,
            descricao: "Carro pouco rodado",
            vendido: 1,
            created: "2020-08-25 21:06:25",
            updated: ""
        },
        {
            id: 5,
            veiculo: "Chevette",
            marca: "Chevrolet",
            ano: 1970,
            descricao: "Carro bem conservado",
            vendido: 0,
            created: "2020-08-25 22:10:43",
            updated: ""
        },
        {
            id: 6,
            veiculo: "S10",
            marca: "Toyota",
            ano: 2012,
            descricao: "Carro grande",
            vendido: 0,
            created: "2020-08-25 22:17:42",
            updated: "2020-08-25 22:26:54"
        },
        {
            id: 7,
            veiculo: "Eclipse",
            marca: "Mitsubishi",
            ano: 1995,
            descricao: "Carro baixo",
            vendido: 1,
            created: "2020-08-25 22:19:05",
            updated: "2020-08-25 22:35:01"
        },
        {
            id: 8,
            veiculo: "TT",
            marca: "Audi",
            ano: 2011,
            descricao: "Carro conversível",
            vendido: 1,
            created: "2020-08-25 22:19:25",
            updated: "2020-08-25 22:46:29"
        },
        {
            id: 10,
            veiculo: "Doubló",
            marca: "Fiat",
            ano: 2007,
            descricao: "Carro para família",
            vendido: 1,
            created: "2020-08-25 22:21:15",
            updated: "2020-08-26 21:25:19"
        },
        {
            id: 12,
            veiculo: "206",
            marca: "Peugeot",
            ano: 2006,
            descricao: "Carro para casal",
            vendido: 1,
            created: "2020-08-26 21:23:51",
            updated: ""
        }
    ]);

    return (
        <div>
            <Grid container spacing = {3}>
                {
                    veiculos.map(veiculo => (
                        <CardVeiculo
                            key = {veiculo.id}
                            id = {veiculo.id}
                            veiculo = {veiculo.veiculo}
                            marca = {veiculo.marca}
                            ano = {veiculo.ano}
                            descricao = {veiculo.descricao}
                            vendido = {veiculo.vendido}
                            created = {veiculo.created}
                        />
                    ))
                }
            </Grid>
        </div>
    )
}

export default Home;