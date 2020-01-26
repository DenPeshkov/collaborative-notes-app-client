import React from "react";
import AppToolbar from "../components/AppToolbar";
import Note from "../components/Note";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    layout: {},
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            marginLeft: theme.spacing(6),
            marginRight: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}));

function Notes(props) {
    const classes = useStyles();
    return (
        <div className={classes.layout}>
            <AppToolbar {...props}/>
            <Paper variant="outlined" elevation={3} className={classes.paper}>
                <Note/>
            </Paper>
        </div>
    );
}

export default Notes;