import React, { useState, useEffect } from "react";
import NovoVeiculo from "../interfaces/novo-veiculo-interface";
import { Paper, FormControl, InputLabel, MenuItem, Select, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TituloPagina from "../components/TituloPagina";
import services from "../services/services";
import MarcaInterface from "../interfaces/marca-interface";
import ModeloInterface from "../interfaces/modelo-interface";
import ResponseInterface from "../interfaces/response-interface";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            maxWidth: "1200px",
            margin: "auto",
            padding: "15px"
        },

        formControl: {
            margin: theme.spacing(1),
            width: "90%",
            maxWidth: "742px"
        }
    })
)

const Home: React.FunctionComponent = () => {
    const classes = useStyles();
    
    const [novoVeiculo, setNovoVeiculo] = useState<NovoVeiculo>({idMarca: "", idModelo: "", ano: 0, descricao: "", vendido: 1});
    const [marcas, setMarcas] = useState<MarcaInterface[]>([]);
    const [modelos, setModelos] = useState<ModeloInterface[]>([]);

    useEffect(() => {
        getDadosByParametros("q=marcas&p=");
    }, [])

    useEffect(() => {
        if (novoVeiculo.idMarca > 0) {
            getDadosByParametros(`q=modelos&p=${novoVeiculo.idMarca}`)
        }
    }, [novoVeiculo.idMarca])

    const getDadosByParametros = async (param: string) => {
        const response: ResponseInterface = await services.getDados(param);
        if (param === "q=marcas&p=") {
            const marcasCadastradas: MarcaInterface[] = response.params.marcas;
            setMarcas(marcasCadastradas);
        } else {
            const modelosCadastrados: ModeloInterface[] = response.params.modelos;
            setModelos(modelosCadastrados);
        }
    }

    const insertVeiculo = async () => {

        const newId = await services.insertVeiculo(novoVeiculo);

        setNovoVeiculo({...novoVeiculo, idVeiculo: newId})
    }

    return (
        <Paper className = {classes.paper}>
            <TituloPagina titulo = "Cadastrar Veículo" />

            <Grid container>
                <Grid item xs = {12} sm = {6} md = {4}>
                    <FormControl className = {classes.formControl}>
                        <InputLabel>Marca</InputLabel>
                        <Select
                            value = {novoVeiculo.idMarca}
                            onChange = {(e) => setNovoVeiculo({...novoVeiculo, idMarca: e.target.value as number})}
                        >
                            {
                                marcas.map(marca => <MenuItem key = {marca.idMarca} value = {marca.idMarca}>{marca.nome}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs = {12} sm = {6} md = {4}>
                    <FormControl className = {classes.formControl}>
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

                <Grid item xs = {12} sm = {6} md = {4}>
                    <FormControl className = {classes.formControl}>
                        <TextField
                            label = "Ano"
                            value = {novoVeiculo.ano === 0 ? "" : novoVeiculo.ano}
                            onChange = {(e: any) => setNovoVeiculo({...novoVeiculo, ano: e.target.value})}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs = {12}>
                    <FormControl className = {classes.formControl}>
                        <TextField
                            label = "Descrição"
                            value = {novoVeiculo.descricao}
                            onChange = {(e: any) => setNovoVeiculo({...novoVeiculo, descricao: e.target.value})}
                            multiline
                            rows = {5}
                            variant = "outlined"
                            inputProps = {{
                                maxLength: 500
                            }}
                        />
                    {novoVeiculo.descricao.length} de 500 caracteres restantes
                    </FormControl>
                </Grid>

                <Grid item xs = {12}>
                    <FormControl component = "fieldset">
                        <FormLabel component = "legend">Vendido?</FormLabel>
                        <RadioGroup
                            value = {novoVeiculo.vendido}
                            onChange = {(e: any) => setNovoVeiculo({...novoVeiculo, vendido: e.target.value})}
                        >
                            <FormControlLabel value = {1} control = {<Radio />} label = "Sim"/>
                            <FormControlLabel value = {0} control = {<Radio />} label = "Não"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

            <Button variant = "contained" color = "primary" onClick = {insertVeiculo}>Salvar</Button>

            {/* Upload de imagem???? */}
        </Paper>
    )
}

export default Home;
