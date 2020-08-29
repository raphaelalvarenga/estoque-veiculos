import React, { useState } from "react";
import Home from "./views/Home";
import CadastrarVeiculo from "./views/CadastrarVeiculo";
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { Menu, Person, Home as HomeIcon, DirectionsCar, BarChart } from "@material-ui/icons";
import globalStyles from "./assets/styles/styles";
import AtualizarVeiculo from "./views/AtualizarVeiculo";
import Estatisticas from "./views/Estatisticas";

const App: React.FunctionComponent = () => {

    const classes = globalStyles();

    const [drawer, setDrawer] = useState<boolean>(false);

    return (
        <BrowserRouter>
            <CssBaseline />

            <AppBar position = "static">
                <Toolbar>
                    <IconButton
                        edge = "start"
                        color = "inherit"
                        className = {classes.menuButton}
                        onClick = {() => setDrawer(true)}
                    >
                        <Menu />
                    </IconButton>

                    <Typography variant = "h6" className = {classes.title}></Typography>

                    <IconButton color = "inherit"><Person /></IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor = "left"
                open = {drawer}
                onClose = {() => setDrawer(false)}
            >
                <List className = {classes.drawerList}>
                    {
                        [
                            {id: 1, nome: "Home", link: "/"},
                            {id: 2, nome: "Cadastrar Veículo", link: "/cadastrar-veiculo"},
                            {id: 3, nome: "Estatísticas", link: "/estatisticas"}
                        ].map(rota => (
                            <ListItem key = {rota.id} button component = {Link} to = {rota.link} onClick = {() => setDrawer(false)}>
                                <ListItemIcon>
                                    {
                                        rota.nome === "Home" ?
                                            <HomeIcon /> :
                                        rota.nome === "Cadastrar Veículo" ?
                                            <DirectionsCar /> :
                                            <BarChart />
                                    }
                                </ListItemIcon>
                                <ListItemText primary = {rota.nome} />
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>

            <Switch>
                <Route exact path = "/" component = {Home} />
                <Route path = "/cadastrar-veiculo" component = {CadastrarVeiculo} />
                <Route path = "/atualizar-veiculo/:id" component = {AtualizarVeiculo} />
                <Route path = "/estatisticas" component = {Estatisticas} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;