import React, { useState } from "react";
import Home from "./views/Home";
import CadastrarVeiculo from "./views/CadastrarVeiculo";
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { Menu, Person, Home as HomeIcon, DirectionsCar } from "@material-ui/icons";
import globalStyles from "./assets/styles/styles";

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

                    <Button color = "inherit"><Person /></Button>
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
                            {id: 2, nome: "Cadastrar Veículo", link: "/cadastrar-veiculo"}
                        ].map(rota => (
                            <ListItem key = {rota.id} button component = {Link} to = {rota.link} onClick = {() => setDrawer(false)}>
                                <ListItemIcon>
                                    {
                                        rota.nome === "Home" ? <HomeIcon /> : <DirectionsCar />
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
            </Switch>
        </BrowserRouter>
    )
}

export default App;