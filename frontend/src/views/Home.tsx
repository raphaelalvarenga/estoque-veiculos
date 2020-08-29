import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Veiculo from "../interfaces/veiculo-interface";
import CardVeiculo from "../components/CardVeiculo";
import ResponseInterface from "../interfaces/response-interface";

const Home: React.FunctionComponent = () => {
    
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

    useEffect(() => {
        getVeiculos();
    }, []);

    const getVeiculos = () => {
        fetch("http://localhost:5000/veiculos")
            .then(res => res.json())
            .then((response: ResponseInterface) => setVeiculos(response.params.veiculos));
    }

    return (
        <div>
            <Grid container spacing = {3}>
                {
                    veiculos.map(veiculo => (
                        <CardVeiculo
                            key = {veiculo.idVeiculo}
                            idVeiculo = {veiculo.idVeiculo}
                            marca = {veiculo.marca}
                            modelo = {veiculo.modelo}
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