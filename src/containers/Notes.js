import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {List} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AppToolbar from "../components/AppToolbar";
import Note from "../components/Note";
import TextField from "@material-ui/core/TextField";
import NotesListItems from "../components/NotesListItems";

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
        //width: "100%"
    },
    textField: {
        "& .MuiFilledInput-root": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }
    },
    search: {
        borderRight: "1px solid rgba(0, 0, 0, 0.23)",
        padding: "5px"
    }
}));

function Notes(props) {
    const classes = useStyles();
    const notes = ["волаовавава", "djdfkdjf", "lskfjisafasHgyu sigfisf siufsfisa", "ks;lsk dsiod"];
    const [searchStr, setSearchStr] = React.useState("");
    const handleChange = event => {
        setSearchStr(event.target.value);
    };

    return (
        <>
            <AppToolbar {...props}/>
            <Grid container spacing={0} className={classes.root}>
                <Grid item style={{"flexGrow": "1"}}>
                    <TextField placeholder="Поиск" type="search" fullWidth value={searchStr} onChange={handleChange}
                               className={classes.search}/>
                    <List className={classes.list}>
                        <NotesListItems notes={notes.filter(note => note.startsWith(searchStr))}/>
                    </List>
                </Grid>
                <Grid item style={{"flexGrow": "3"}}>
                    <Note/>
                </Grid>
            </Grid>
        </>
    );
}

export default Notes;