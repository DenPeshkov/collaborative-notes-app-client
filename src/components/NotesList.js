import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import {List, ListItemSecondaryAction} from "@material-ui/core";
import 'react-quill/dist/quill.snow.css'; // ES6
import "../components/Note.css"
import ListItem from "@material-ui/core/ListItem";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    list: {
        height: "100%",
        borderRight: "1px solid rgba(0, 0, 0, 0.23)",
        width: "100%"
    }
}));

function Notes() {
    const classes = useStyles();

    return (
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
    );
}

export default Notes;