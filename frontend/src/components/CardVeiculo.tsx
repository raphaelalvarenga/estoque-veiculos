import React from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import caravatar from "../assets/images/caravatar.png";
import Veiculo from "../interfaces/veiculo-interface";

const useStyles = makeStyles({
    root: {
        maxWidth: 345
    }
});

const CardVeiculo = (veiculo: Veiculo) => {

    const classes = useStyles();

    return (
        <Grid item xs = {12} sm = {6} md = {4}>
            <Card className = {classes.root}>
                <CardActionArea>
                    <CardMedia
                        component = "img"
                        alt = {veiculo.descricao}
                        height = "140"
                        image = {caravatar}
                        title = {`${veiculo.marca} ${veiculo.veiculo}`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant = "h5" component = "h2">
                            {veiculo.marca} {veiculo.veiculo}
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