import React from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, IconButton } from "@material-ui/core";
import caravatar from "../assets/images/caravatar.png";
import Veiculo from "../interfaces/veiculo-interface";
import globalStyles from "../assets/styles/styles";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

type Props = {
    veiculo: Veiculo,
    deletar: (idVeiculo: number) => void
}

const CardVeiculo = (props: Props) => {

    const classes = globalStyles();

    return (
        <Grid
            item
            xs = {12}
            sm = {6}
            md = {4}
            key = {props.veiculo.idVeiculo}
            component = {Link}
            to = {`/atualizar-veiculo/${props.veiculo.idVeiculo}`}
            style = {{textDecoration: "none"}}
        >
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
                    <Button
                        component = {Link}
                        size = "small"
                        to = {`/atualizar-veiculo/${props.veiculo.idVeiculo}`}
                        color = "primary"
                    >Editar</Button>
                    <IconButton
                        size = "small"
                        color = "secondary"
                        onClick = {() => props.deletar(props.veiculo.idVeiculo!)}
                    ><Delete /></IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default CardVeiculo;