import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import {List, ListItemSecondaryAction} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import 'react-quill/dist/quill.snow.css'; // ES6
import "../components/Note.css"
import AppToolbar from "../components/AppToolbar";
import ListItem from "@material-ui/core/ListItem";
import Note from "../components/Note";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        margin: "0",
        padding: "0"
    },
    noteApp: {},

    list: {
        height: "100%",
        borderRight: "1px solid rgba(0, 0, 0, 0.23)",
        width: "100%"
    },
    textField: {
        "& .MuiFilledInput-root": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }
    }
}));

function Notes(props) {
    const classes = useStyles();

    return (
        <>
            <AppToolbar {...props}/>
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={3}>
                    <List className={classes.list}>
                        <ListItem button>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
                            <ListItemSecondaryAction>
                                <Fab color="primary" aria-label="edit">
                                    <DeleteIcon/>
                                </Fab>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <Note/>
                </Grid>
            </Grid>
        </>
    );
}

export default Notes;