import React, { useState, useEffect } from "react";
import NovoVeiculo from "../interfaces/novo-veiculo-interface";
import { Paper, FormControl, InputLabel, MenuItem, Select, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Button, Snackbar, IconButton } from "@material-ui/core";
import TituloPagina from "../components/TituloPagina";
import services from "../services/services";
import MarcaInterface from "../interfaces/marca-interface";
import ModeloInterface from "../interfaces/modelo-interface";
import ResponseInterface from "../interfaces/response-interface";
import globalStyles from "../assets/styles/styles";
import { Close, Save } from "@material-ui/icons/";
import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
    id: string;
}

const AtualizarVeiculo = (props: RouteComponentProps<MatchParams>) => {
    const classes = globalStyles();

    const [novoVeiculo, setNovoVeiculo] = useState<NovoVeiculo>({idMarca: "", idModelo: "", ano: 0, descricao: "", vendido: "1"});
    const [marcas, setMarcas] = useState<MarcaInterface[]>([]);
    const [modelos, setModelos] = useState<ModeloInterface[]>([]);
    const [snackbar, setSnackbar] = useState<{status: boolean, mensagem: string}>({status: false, mensagem: ""});

    useEffect(() => {
        getVeiculoById();
    }, [])

    useEffect(() => {
        if (novoVeiculo.idMarca > 0) {
            getDadosByParametros(`q=modelos&p=${novoVeiculo.idMarca}`)
        }
    }, [novoVeiculo.idMarca]);

    const getVeiculoById = async () => {
        try {
            const idVeiculo = parseInt(props.match.params.id);
            const response: ResponseInterface = await services.getVeiculoById(idVeiculo);

            if (response.success) {
                let novoVeiculo = response.params.veiculo[0];
                novoVeiculo.vendido = novoVeiculo.vendido.toString();

                setMarcas(response.params.marcas);
                setModelos(response.params.modelos);
                setNovoVeiculo(response.params.veiculo[0]);
            }
        }

        catch (erro) {
            setSnackbar({status: true, mensagem: "Falha na busca dos dados. Atualize a página..."})
        }
    }

    const getDadosByParametros = async (param: string) => {
        try {
            const response: ResponseInterface = await services.getDados(param);
            if (param === "q=marcas&p=") {
                const marcasCadastradas: MarcaInterface[] = response.params.marcas;
                setMarcas(marcasCadastradas);
            } else {
                const modelosCadastrados: ModeloInterface[] = response.params.modelos;
                setModelos(modelosCadastrados);
            }
        }
        
        catch (erro) {
            setSnackbar({status: true, mensagem: "Falha na busca de dados. Atualize a página..."})
        }
    }

    const putVeiculo = async () => {
        const {idMarca, idModelo, ano, descricao, vendido} = novoVeiculo;

        const condicionais = [
            idMarca === "",
            idModelo === "",
            ano === 0,
            descricao === "",
            vendido !== "1" && vendido !== "0"
        ]

        if (condicionais.includes(true)) {
            alert("Preencha todos os campos!");
            return false;
        }

        try {
            await services.putVeiculo(novoVeiculo);
            setNovoVeiculo({idMarca: "", idModelo: "", ano: 0, descricao: "", vendido: "1"});
            setSnackbar({status: true, mensagem: "Cadastro realizado com sucesso!"});
        }

        catch (erro) {
            setSnackbar({status: true, mensagem: "Falha no cadastro! Tente novamente!"});
        }
    }

    return (
        <Paper className = {classes.paper}>
            <TituloPagina titulo = "Atualizar Veículo" />

            <Grid container>
                <Grid item xs = {12} sm = {6} md = {4} className = {classes.gridFormularios}>
                    <FormControl className = {classes.formControl} required>
                        <InputLabel>Marca</InputLabel>
                        <Select
                            value = {novoVeiculo.idMarca}
                            onChange = {(e) => setNovoVeiculo({...novoVeiculo, idModelo: "", idMarca: e.target.value as number})}
                        >
                            {
                                marcas.map(marca => <MenuItem key = {marca.idMarca} value = {marca.idMarca}>{marca.nome}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs = {12} sm = {6} md = {4} className = {classes.gridFormularios}>
                    <FormControl className = {classes.formControl} required>
                        <InputLabel>Modelo</InputLabel>
                        <Select
                            value = {novoVeiculo.idModelo}
                            onChange = {(e: any) => setNovoVeiculo({...novoVeiculo, idModelo: e.target.value})}
                            disabled = {novoVeiculo.idMarca === ""}
                        >
                            {
                                modelos.map(modelo => <MenuItem key = {modelo.idModelo} value = {modelo.idModelo}>{modelo.nome}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs = {12} sm = {6} md = {4} className = {classes.gridFormularios}>
                    <FormControl className = {classes.formControl} required>
                        <TextField
                            label = "Ano"
                            value = {novoVeiculo.ano === 0 ? "" : novoVeiculo.ano}
                            onChange = {(e: any) => setNovoVeiculo({...novoVeiculo, ano: e.target.value})}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs = {12} className = {classes.gridFormularios}>
                    <FormControl className = {classes.formControl}>
                        <TextField
                            label = "Descrição"
                            value = {novoVeiculo.descricao}
                            onChange = {(e: any) => setNovoVeiculo({...novoVeiculo, descricao: e.target.value})}
                            multiline
                            required
                            rows = {5}
                            variant = "outlined"
                            inputProps = {{
                                maxLength: 500
                            }}
                            helperText = {`${novoVeiculo.descricao.length} de 500 caracteres restantes`}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs = {12} className = {classes.gridFormularios} style = {{marginLeft: "8px"}}>
                    <FormControl component = "fieldset">
                        <FormLabel component = "legend">Vendido?</FormLabel>
                        <RadioGroup
                            value = {novoVeiculo.vendido}
                            onChange = {(e) => setNovoVeiculo({...novoVeiculo, vendido: e.target.value})}
                            name = "vendido"
                        >
                            <FormControlLabel value = "1" control = {<Radio />} label = "Sim"/>
                            <FormControlLabel value = "0" control = {<Radio />} label = "Não"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

            <Button
                variant = "contained"
                color = "primary"
                onClick = {putVeiculo}
                startIcon = {<Save />}
            >Salvar</Button>

            {/* Upload de imagem???? */}

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
    )
}

export default AtualizarVeiculo;
