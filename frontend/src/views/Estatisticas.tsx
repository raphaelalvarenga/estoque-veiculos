import React, { useState, useEffect } from "react";
import { Snackbar, IconButton, Paper } from "@material-ui/core";
import services from "../services/services";
import ResponseInterface from "../interfaces/response-interface";
import { Close } from "@material-ui/icons";
import globalStyles from "../assets/styles/styles";
import TituloPagina from "../components/TituloPagina";
import { LineChart, Line } from "recharts";

type QtdDecadas = { decada: number, qtd: number };
type QtdMarcas = { nome: string, qtd: number };
type QtdVendidos = { situacao: string, qtd: number };

const Estatisticas: React.FunctionComponent = () => {

    const classes = globalStyles();

    const [qtdDecadas, setQtdDecadas] = useState<QtdDecadas[]>([]);
    const [qtdMarcas, setQtdMarcas] = useState<QtdMarcas[]>([]);
    const [qtdVendidos, setQtdVendidos] = useState<QtdVendidos[]>([]);
    const [snackbar, setSnackbar] = useState<{status: boolean, mensagem: string}>({status: false, mensagem: ""});

    useEffect(() => {
        getEstatisticas();
    }, []);

    const getEstatisticas = async () => {

        try {
            const response: ResponseInterface = await services.getEstatisticas();

            if (response.success) {
                setQtdDecadas(response.params.qtdDecadas);
                setQtdMarcas(response.params.qtdMarcas);
                setQtdVendidos(response.params.qtdVendidos);
            }
        }

        catch (erro) {
            setSnackbar({status: true, mensagem: "Falha no carregamento dos dados. Atualize a página..."});
        }
    }
    
    return (
        <>
            <Paper className = {classes.paper}>
                <TituloPagina titulo = "Estatísticas" />
                
                
            </Paper>

            <Snackbar
                open = {snackbar.status}
                autoHideDuration = {6000}
                message = {snackbar.mensagem}
                onClose = {() => setSnackbar({status: false, mensagem: ""})}
                anchorOrigin = {{
                    vertical: "top",
                    horizontal: "right"
                }}
                action = {
                    <IconButton color = "inherit" onClick = {() => setSnackbar({status: false, mensagem: ""})}>
                        <Close fontSize = "small" />
                    </IconButton>
                }
            />
        </>
    )
}

export default Estatisticas;