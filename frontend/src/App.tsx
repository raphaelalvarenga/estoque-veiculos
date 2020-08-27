import React from "react";
import Home from "./views/Home";
import CadastrarVeiculo from "./views/CadastrarVeiculo";
import { CssBaseline } from "@material-ui/core";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";

const App: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
            <CssBaseline />

            <nav>
                <ul>
                    <li><Link to = "/">Home</Link></li>
                    <li><Link to = "/cadastrar-veiculo">Cadastrar Veículo</Link></li>
                </ul>
            </nav>

            <Switch>
                <Route exact path = "/" component = {Home} />
                <Route path = "/cadastrar-veiculo" component = {CadastrarVeiculo} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;