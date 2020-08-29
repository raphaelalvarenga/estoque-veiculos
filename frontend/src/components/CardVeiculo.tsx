import React from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import caravatar from "../assets/images/caravatar.png";
import Veiculo from "../interfaces/veiculo-interface";
import globalStyles from "../assets/styles/styles";

type Props = {
    veiculo: Veiculo,
    deletar: (idVeiculo: number) => void
}

const CardVeiculo = (props: Props) => {

    const classes = globalStyles();

    return (
        <Grid item xs = {12} sm = {6} md = {4} key = {props.veiculo.idVeiculo}>
            <Card className = {classes.card} style = {{margin: "auto"}}>
                <CardActionArea>
                    <CardMedia
                        component = "img"
                        alt = {props.veiculo.descricao}
                        height = "140"
                        image = {caravatar}
                        title = {`${props.veiculo.marca} ${props.veiculo.modelo}`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant = "h5" component = "h2">
                            {props.veiculo.marca} {props.veiculo.modelo}
                        </Typography>

                        <Typography variant = "body2" color = "textSecondary" component = "p">
                            Ano: {props.veiculo.ano}
                        </Typography>

                        <Typography variant = "body2" color = "textSecondary" component = "p">
                            Vendido: {props.veiculo.vendido === 1 ? "Sim" : "Não"}
                        </Typography>

                        <Typography variant = "body2" color = "textSecondary" component = "p">
                            Cadastro: {props.veiculo.created}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size = "small" color = "primary">Editar</Button>
                    <Button size = "small" color = "secondary" onClick = {() => props.deletar(props.veiculo.idVeiculo!)}>Deletar</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default CardVeiculo;