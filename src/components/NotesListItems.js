import React from "react";
import NotesListItem from "./NotesListItem";

function NotesListItems(props) {
    const items = props.notes.map((note, i) => <NotesListItem name={i} text={note}/>)
    return (
        items
    );
}

export default NotesListItems;