import React, { useState, useEffect } from "react";
import { Snackbar, IconButton, Paper, Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import services from "../services/services";
import ResponseInterface from "../interfaces/response-interface";
import { Close, Edit } from "@material-ui/icons";
import globalStyles from "../assets/styles/styles";
import TituloPagina from "../components/TituloPagina";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Legend, Cell } from "recharts";
import Veiculo from "../interfaces/veiculo-interface";

type QtdDecadas = { decada: string, qtd: number };
type QtdMarcas = { nome: string, qtd: number };
type QtdVendidos = { situacao: string, qtd: number };

const Estatisticas: React.FunctionComponent = () => {

    const classes = globalStyles();

    const COLORS = ["#8884d8", "#1c2422", "#80d9ff", "#466cb8", "#5146b8"]

    const [qtdDecadas, setQtdDecadas] = useState<QtdDecadas[]>([]);
    const [qtdMarcas, setQtdMarcas] = useState<QtdMarcas[]>([]);
    const [qtdVendidos, setQtdVendidos] = useState<QtdVendidos[]>([]);
    const [ultimosRegistros, setUltimosRegistros] = useState<Veiculo[]>([]);
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
                setUltimosRegistros(response.params.ultimosRegistros);
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

                <Grid container>
                    <Grid item xs = {12} sm = {6} style = {{marginBottom: "100px"}}>
                        <Typography variant = "h6" color = "inherit" style = {{textAlign: "center"}}>Vendidos</Typography>
                        <PieChart width = {730} height = {250}>
                            <Pie data = {qtdVendidos} dataKey = "qtd" nameKey = "situacao" label outerRadius = {80} cx = "40%" cy = "50%">
                                {
                                    qtdVendidos.map((entry, index) => (
                                        <Cell key = {`cell-${index}`} fill = {index % 2 === 0 ? "#8884d8" : "#f21a57"} />
                                    ))
                                }
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Grid>

                    <Grid item xs = {12} sm = {6} style = {{marginBottom: "100px"}}>
                        <Typography variant = "h6" color = "inherit" style = {{textAlign: "center"}}>Relação por Décadas</Typography>
                        <PieChart width = {730} height = {250}>
                            <Pie data = {qtdDecadas} dataKey = "qtd" nameKey = "decada" label outerRadius = {80} cx = "40%" cy = "50%">
                                {
                                    qtdDecadas.map((entry, index) => (
                                        <Cell key = {`cell-${index}`} fill = {COLORS[index]} />
                                    ))
                                }
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Grid>

                    <Grid item xs = {12} style = {{marginBottom: "100px"}}>
                        <Typography variant = "h6" color = "inherit" style = {{textAlign: "center"}}>Relação por Marcas</Typography>
                        <BarChart width = {1100} height = {400} data = {qtdMarcas}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nome" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="qtd" fill="#8884d8" />
                        </BarChart>
                    </Grid>
                </Grid>

                <Typography variant = "h6" style = {{textAlign: "center"}}>Registros da Última Semana</Typography>

                <TableContainer component = {Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Data</TableCell>
                                <TableCell>Marca</TableCell>
                                <TableCell>Modelo</TableCell>
                                <TableCell>Ano</TableCell>
                                <TableCell>Vendido</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                ultimosRegistros.map(ultimoRegistro => (
                                    <TableRow key = {ultimoRegistro.idVeiculo}>
                                        <TableCell>{ultimoRegistro.created}</TableCell>
                                        <TableCell>{ultimoRegistro.marca}</TableCell>
                                        <TableCell>{ultimoRegistro.modelo}</TableCell>
                                        <TableCell>{ultimoRegistro.ano}</TableCell>
                                        <TableCell>{ultimoRegistro.vendido === 1 ? "Sim" : "Não"}</TableCell>
                                        <TableCell>
                                            <IconButton size = "small" color = "primary"><Edit /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                
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