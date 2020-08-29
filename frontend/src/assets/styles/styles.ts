import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const globalStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },

        menuButton: {
            marginRight: theme.spacing(2),
        },

        title: {
            flexGrow: 1,
        },

        drawerList: {
            width: "250px"
        },

        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },

        paper: {
            maxWidth: "1200px",
            margin: "40px auto 60px auto",
            padding: "15px",
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