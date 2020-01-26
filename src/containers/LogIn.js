import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MuiLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from "react-router-dom";
import AppToolbar from "../components/AppToolbar";
import {useFormFields} from "../libs/useFormFields";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <MuiLink color="inherit" href="https://material-ui.com/">
                Your Website
            </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function LogIn(props) {
    const classes = useStyles();

    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });

    function handleSubmit(event) {
        event.preventDefault();
        props.history.push("/");

        props.appProps.userHasAuthenticated(true);
    }

    return (
        <>
            <AppToolbar type="login" {...props}/>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Войти
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email адрес"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleFieldChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleFieldChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Запомнить меня"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <MuiLink href="#" variant="body2">
                                    Забыли пароль?
                                </MuiLink>
                            </Grid>
                            <Grid item>
                                <MuiLink component={Link} to="/signup" variant="body2">
                                    {"Нет аккаунта? Зарегистрироваться!"}
                                </MuiLink>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        </>
    );
}

export default LogIn;