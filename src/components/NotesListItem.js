import ListItemText from "@material-ui/core/ListItemText";
import {ListItemSecondaryAction} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import React from "react";

function NotesListItem(props) {
    return (<ListItem button>
            <ListItemText primary={`Название ${props.name}`} secondary={`${props.text}`}/>
            <ListItemSecondaryAction>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default NotesListItem;