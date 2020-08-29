import React, { useState, useEffect } from "react";
import { Grid, Dialog, Slide, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, IconButton, Paper, CircularProgress, Backdrop } from "@material-ui/core";
import Veiculo from "../interfaces/veiculo-interface";
import CardVeiculo from "../components/CardVeiculo";
import services from "../services/services";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import ResponseInterface from "../interfaces/response-interface";
import { Close } from "@material-ui/icons";
import globalStyles from "../assets/styles/styles";
import TituloPagina from "../components/TituloPagina";

type DialogControl = {status: boolean, titulo: string, mensagem: string, idVeiculoEscopo: number};

const Transition = React.forwardRef(function Transition(
        props: TransitionProps & { children?: React.ReactElement<any, any> },
        ref: React.Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Home: React.FunctionComponent = () => {

    const classes = globalStyles();
    
    return (
        <Paper className = {classes.paper}>
            <TituloPagina titulo = "Estatísticas" />
            
        </Paper>
    )
}

export default Home;