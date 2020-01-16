import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Link as MuiLink, Button, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1
    },
    appbar: {
        flexWrap: "wrap"
    },
    toolbar: {
        flexWrap: 'wrap'
    },
    nav: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    logIn: {
        ...theme.typography.button,
    }
}));

function Home() {
    const classes = useStyles();

    return (
        <>
            <MuiLink color='inherit' component={Link} to="/" underline="none"
                     variant='h4' className={classes.title}>ShareNotes</MuiLink>
            <nav className={classes.nav}>
                <Button color="inherit" variant='outlined' component={Link} to="/signup">Зарегистрироваться</Button>
                <MuiLink color='inherit' component={Link} to="/login" className={classes.logIn}>Войти</MuiLink>
            </nav>
        </>
    );
}

function AppToolbar(props) {
    const classes = useStyles();

    let content;

    switch (props.type) {
        default:
            content = Home();
    }

    return (
        <AppBar position="static" elevation='false' className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                {content}
            </Toolbar>
        </AppBar>
    );
}

export default AppToolbar;
