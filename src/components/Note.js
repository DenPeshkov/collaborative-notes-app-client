import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    textField: {
        "& .MuiInput-root": {
            padding: "10px",
            fontSize: "2rem"
        }
    },
    grow: {
        flexGrow: 1
    }
}));

function Note(props) {
    const classes = useStyles();

    const [text, setText] = useState("");

    return (
        <>
            <AppBar elevation='false' position="static" color="inherit">
                <Toolbar>
                    <IconButton>
                        <ExpandMoreIcon/>
                    </IconButton>
                    <IconButton>
                        <ExpandLessIcon/>
                    </IconButton>
                    <div className={classes.grow}>
                    </div>
                    <IconButton color="primary">
                        <SaveIcon/>
                    </IconButton>
                    <IconButton color="primary">
                        <DeleteIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <TextField fullWidth placeholder="Название" className={classes.textField}/>
            <ReactQuill value={text} onChange={setText}/>
        </>
    )
}

export default Note;