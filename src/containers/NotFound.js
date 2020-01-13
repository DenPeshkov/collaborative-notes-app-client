import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    notFound: {
        padding: theme.spacing(8),
    }
}));

export default function NotFound() {
    const classes = useStyles();

    return (
        <Typography variant="h1" align="center" color="textPrimary" className={classes.notFound}>
            Page not found!
        </Typography>
    );
}