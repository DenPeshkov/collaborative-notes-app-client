import React from 'react';
import 'react-quill/dist/quill.snow.css';
import {makeStyles} from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {List} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({}))
;

function Notes() {
    const classes = useStyles();

    return (
        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemText primary={text}/>
                </ListItem>
            ))}
        </List>
    );
}

export default Notes;