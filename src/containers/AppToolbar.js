import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Link as MuiLink, Button, Typography} from '@material-ui/core';
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

function Auth() {
    const classes = useStyles();

    return (
        <>
            <MuiLink color='inherit' component={Link} to="/" underline="none"
                     variant='h4' className={classes.title}>ShareNotes</MuiLink>
            <Button color="inherit" variant='outlined' component={Link} to="/signup">Зарегистрироваться</Button>
            <Typography>
                <MuiLink color='inherit' component={Link} to="/login" className={classes.logIn}>Войти</MuiLink>
            </Typography>
        </>
    );
}

function AppToolbar(props) {
    const classes = useStyles();

    let content;

    switch (props.type) {
        default:
            content = Auth();
    }

    return (
        <AppBar position="fixed" elevation='false'>
            <Toolbar className={classes.toolbar}>
                {content}
            </Toolbar>
        </AppBar>
    );
}

export default AppToolbar;
