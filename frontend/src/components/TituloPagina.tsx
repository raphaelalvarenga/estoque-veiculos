import React from "react";
import { Typography, Divider } from "@material-ui/core";

type Props = {
    titulo: string
}

const TituloPagina = (props: Props) => {
    return (
        <div style = {{marginBottom: "20px"}}>
            <Typography variant = "h5" gutterBottom>{props.titulo}</Typography>
            <Divider />
        </div>
    )
}

export default TituloPagina;