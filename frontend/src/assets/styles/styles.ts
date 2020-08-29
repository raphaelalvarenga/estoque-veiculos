import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const globalStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            maxWidth: "1200px",
            margin: "auto",
            padding: "15px"
        },

        gridFormularios: {
            marginBottom: "20px"
        },

        formControl: {
            margin: theme.spacing(1),
            width: "90%",
            maxWidth: "742px"
        },

        card: {
            maxWidth: 345
        }
    })
)

export default globalStyles;