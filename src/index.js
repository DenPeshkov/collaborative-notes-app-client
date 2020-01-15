import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {CssBaseline, createMuiTheme, ThemeProvider} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        background: {
            default: '#fff'
        }
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Router>
            <CssBaseline/>
            <App/>
        </Router>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
