import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    textField: {
        "& .MuiFilledInput-root": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }
    }
}));

function Note(props) {
    const classes = useStyles();

    const [text, setText] = useState("");

    return (
        <>
            <TextField fullWidth placeholder="Название" variant="filled" className={classes.textField}/>
            <ReactQuill value={text} onChange={setText}/>
        </>
    )
}

export default Note;