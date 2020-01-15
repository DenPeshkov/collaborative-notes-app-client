import React from "react";
import {Typography} from '@material-ui/core';
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    Home: {
        padding: theme.spacing(8, 0, 6),
    }
}));

export default function Home() {
    const classes = useStyles();

    return (
        <Container maxWidth="sm" className={classes.Home}>
            <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
                ShareNotes
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary">
                Простое приложение для создания заметок
            </Typography>
        </Container>
    );
}