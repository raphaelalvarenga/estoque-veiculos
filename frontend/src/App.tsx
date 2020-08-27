import React from "react";
import Home from "./views/Home";
import { CssBaseline } from "@material-ui/core"

const App: React.FunctionComponent = () => {
    return (
        <div>
            <CssBaseline />
            <Home />
        </div>
    )
}

export default App;