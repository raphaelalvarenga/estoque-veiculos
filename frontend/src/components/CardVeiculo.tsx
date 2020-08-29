import React from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import caravatar from "../assets/images/caravatar.png";
import Veiculo from "../interfaces/veiculo-interface";
import globalStyles from "../assets/styles/styles";

const CardVeiculo = (veiculo: Veiculo) => {

    const classes = globalStyles();

    return (
        <Grid item xs = {12} sm = {6} md = {4} key = {veiculo.idVeiculo}>
            <Card className = {classes.card}>
                <CardActionArea>
                    <CardMedia
                        component = "img"
                        alt = {veiculo.descricao}
                        height = "140"
                        image = {caravatar}
                        title = {`${veiculo.marca} ${veiculo.modelo}`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant = "h5" component = "h2">
                            {veiculo.marca} {veiculo.modelo}
                        </Typography>

                        <Typography variant = "body2" color = "textSecondary" component = "p">
                            Ano: {veiculo.ano}
                        </Typography>

                        <Typography variant = "body2" color = "textSecondary" component = "p">
                            Vendido: {veiculo.vendido === 1 ? "Sim" : "Não"}
                        </Typography>

                        <Typography variant = "body2" color = "textSecondary" component = "p">
                            Cadastro: {veiculo.created}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size = "small" color = "primary">Editar</Button>
                    <Button size = "small" color = "secondary">Deletar</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default CardVeiculo;