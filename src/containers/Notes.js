import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import {List} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // ES6
import "../components/Note.css"
import AppToolbar from "../components/AppToolbar";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";

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

function Notes() {
    const classes = useStyles();

    return (
        <>
            <AppToolbar/>
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={3}>
                    <List component="nav" aria-label="main mailbox folders" className={classes.list}>
                        <ListItem button>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014"/>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <TextField fullWidth placeholder="Название" variant="filled" className={classes.textField}/>
                    <ReactQuill className={classes.noteApp}/>
                </Grid>
            </Grid>
        </>
    );
}

export default Notes;