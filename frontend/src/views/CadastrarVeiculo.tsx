import React, { useState } from "react";
import Veiculo from "../interfaces/veiculo-interface";
import { Paper, FormControl, InputLabel, MenuItem, Select, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import BodyRequestInterface from "../interfaces/request-interface";
import TituloPagina from "../components/TituloPagina";
import NovoVeiculo from "../interfaces/novo-veiculo-interface";

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
    
    const [veiculo, setVeiculo] = useState<NovoVeiculo>({idMarca: "", idModelo: "", ano: 0, descricao: "", vendido: 1});

    const cadastrarVeiculo = () => {
        const bodyRequest: BodyRequestInterface = {
            idLogin: 1,
            action: "insertVeiculo",
            token: "gfgfsdgfdsgfd",
            params: {
                "newVeiculo": veiculo
            }
        }

        fetch("http://localhost:5000/veiculos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyRequest)
        });
    }

    return (
        <Paper className = {classes.paper}>
            <TituloPagina titulo = "Cadastrar Veículo" />

            <Grid container>
                <Grid item xs = {12} sm = {6} md = {4}>
                    <FormControl className = {classes.formControl}>
                        <InputLabel>Marca</InputLabel>
                        <Select value = {veiculo.idMarca} onChange = {(e: any) => setVeiculo({...veiculo, idMarca: e.target.value})}>
                            <MenuItem value = "Chevrolet">Chevrolet</MenuItem>
                            <MenuItem value = "Volkswagen">Volkswagen</MenuItem>
                            <MenuItem value = "Toyota">Toyota</MenuItem>
                            <MenuItem value = "Mitsubishi">Mitsubishi</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs = {12} sm = {6} md = {4}>
                    <FormControl className = {classes.formControl}>
                        <InputLabel>Modelo</InputLabel>
                        <Select
                            value = {veiculo.idModelo}
                            onChange = {(e: any) => setVeiculo({...veiculo, idModelo: e.target.value})}
                            disabled = {veiculo.idMarca === ""}
                        >
                            <MenuItem value = "Beetle">Beetle</MenuItem>
                            <MenuItem value = "Gol">Gol</MenuItem>
                            <MenuItem value = "Golf">Golf</MenuItem>
                            <MenuItem value = "Polo">Polo</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs = {12} sm = {6} md = {4}>
                    <FormControl className = {classes.formControl}>
                        <TextField
                            label = "Ano"
                            value = {veiculo.ano === 0 ? "" : veiculo.ano}
                            onChange = {(e: any) => setVeiculo({...veiculo, ano: e.target.value})}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs = {12}>
                    <FormControl className = {classes.formControl}>
                        <TextField
                            label = "Descrição"
                            value = {veiculo.descricao}
                            onChange = {(e: any) => setVeiculo({...veiculo, descricao: e.target.value})}
                            multiline
                            rows = {5}
                            variant = "outlined"
                            inputProps = {{
                                maxLength: 500
                            }}
                        />
                    {veiculo.descricao.length} de 500 caracteres restantes
                    </FormControl>
                </Grid>

                <Grid item xs = {12}>
                    <FormControl component = "fieldset">
                        <FormLabel component = "legend">Vendido?</FormLabel>
                        <RadioGroup
                            value = {veiculo.vendido}
                            onChange = {(e: any) => setVeiculo({...veiculo, vendido: e.target.value})}
                        >
                            <FormControlLabel value = {1} control = {<Radio />} label = "Sim"/>
                            <FormControlLabel value = {0} control = {<Radio />} label = "Não"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

            <Button variant = "contained" color = "primary" onClick = {cadastrarVeiculo}>Salvar</Button>

            {/* Upload de imagem???? */}
        </Paper>
    )
}

export default Home;
