import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Link as MuiLink, Button} from '@material-ui/core';
import Routes from "./Routes";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1
    },
    toolbar: {
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

function App() {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <MuiLink color='inherit' component={Link} to="/" underline="none"
                             variant='h4' className={classes.title}>ShareNotes</MuiLink>
                    <Button color="inherit" variant='outlined' component={Link} to="/signup">SignUp</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                </Toolbar>
            </AppBar>
            <Routes/>
        </div>
    );
}

export default App;
