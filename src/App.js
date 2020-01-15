import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Link as MuiLink, Button, Typography} from '@material-ui/core';
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
    },
    logIn: {
        ...theme.typography.button
    }
}));

function App() {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static" elevation='false'>
                <Toolbar className={classes.toolbar}>
                    <MuiLink color='inherit' component={Link} to="/" underline="none"
                             variant='h4' className={classes.title}>ShareNotes</MuiLink>
                    <Button color="inherit" variant='outlined' component={Link} to="/signup">Зарегистрироваться</Button>
                    <Typography>
                        <MuiLink color='inherit' component={Link} to="/login" className={classes.logIn}>Войти</MuiLink>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Routes/>
        </div>
    );
}

export default App;
