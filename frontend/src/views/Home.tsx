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
    
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [dialog, setDialog] = useState<DialogControl>({status: false, titulo: "", mensagem: "", idVeiculoEscopo: 0});
    const [snackbar, setSnackbar] = useState<{status: boolean, mensagem: string}>({status: false, mensagem: ""});

    useEffect(() => {
        getVeiculos();
    }, []);

    const getVeiculos = async () => {
        try {
            const veiculos: Veiculo[] = await services.getVeiculos();
            setVeiculos(veiculos);
        }

        catch (erro) {
            setSnackbar({status: true, mensagem: "Falha na busca dos registros. Atualize a página..."});
        }

    }

    const clicouDeletarBotao = (idVeiculo: number) => {

        const veiculo = veiculos.find(veiculo => veiculo.idVeiculo === idVeiculo);

        setDialog({
            status: true,
            titulo: "Deletar Registro",
            mensagem: `Tem certeza que deseja remover ${veiculo?.idVeiculo} - ${veiculo?.marca} ${veiculo?.modelo}?`,
            idVeiculoEscopo: veiculo?.idVeiculo!
        })
    }
    
    const deletarVeiculo = async () => {

        try {
            const res: ResponseInterface = await services.deleteVeiculo(dialog.idVeiculoEscopo);

            if (res.success) {
                const newVeiculos = veiculos.filter(veiculo => veiculo.idVeiculo !== dialog.idVeiculoEscopo);
                setVeiculos(newVeiculos);
                setSnackbar({status: true, mensagem: "Registro removido com sucesso!"});
            } else {
                setSnackbar({status: true, mensagem: "Falha na remoção. Tente de novo..."});
            }
        }

        catch (erro) {
            setSnackbar({status: true, mensagem: "Falha na remoção. Tente de novo..."});
        }

        setDialog({status: false, titulo: "", mensagem: "", idVeiculoEscopo: 0});
    }

    return veiculos.length > 0 ?
        <Paper className = {classes.paper}>
            <TituloPagina titulo = "Veículos" />
            <Grid container spacing = {3}>
                {
                    veiculos.map(veiculo => {

                        return (
                            <CardVeiculo
                                key = {veiculo.idVeiculo}
                                veiculo = {veiculo}
                                deletar = {(idVeiculo: number) => clicouDeletarBotao(idVeiculo)}
                            />
                        )})
                }
            </Grid>

            <Dialog
                open = {dialog.status}
                TransitionComponent = {Transition}
                keepMounted
                onClose = {() => setDialog({status: false, titulo: "", mensagem: "", idVeiculoEscopo: 0})}
            >
                <DialogTitle>{dialog.titulo}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialog.mensagem}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color = "primary"
                        onClick = {() => setDialog({status: false, titulo: "", mensagem: "", idVeiculoEscopo: 0})}
                    >Não</Button>
                    <Button color = "secondary" variant = "contained" onClick = {deletarVeiculo}>Sim</Button>
                </DialogActions>
            </Dialog>

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
        </Paper>
        :
        <Backdrop className = {classes.backdrop} open>
            <CircularProgress size = {80} />
        </Backdrop>
}

export default Home;