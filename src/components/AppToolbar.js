import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Button, Link as MuiLink, Toolbar} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";
import NotesListItems from "./NotesListItems";

const drawerWidth = 240;

const useStylesHome = makeStyles(theme => ({
    title: {
        flexGrow: 1
    },
    appBar: {
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

const useStylesLogOut = makeStyles(theme => ({
    title: {
        flexGrow: 1
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
    },
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    list: {
        height: "100%",
        borderRight: "1px solid rgba(0, 0, 0, 0.23)",
        //width: "100%"
    },
    textField: {
        "& .MuiFilledInput-root": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }
    },
    search: {
        borderRight: "1px solid rgba(0, 0, 0, 0.23)",
        padding: "5px"
    }
}));

function Home(props) {
    const classes = useStylesHome();

    return (
        <>
            <AppBar position="static" elevation='false' className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <MuiLink color='inherit' component={Link} to="/" underline="none"
                             variant='h4' className={classes.title}>ShareNotes</MuiLink>
                    <nav className={classes.nav}>
                        <Button color="inherit" variant='outlined' component={Link}
                                to="/signup">Зарегистрироваться</Button>
                        <MuiLink color='inherit' component={Link} to="/login" className={classes.logIn}>Войти</MuiLink>
                    </nav>
                </Toolbar>
            </AppBar>

        </>
    );
}

function LogOut(props) {
    const classes = useStylesLogOut();

    function handleLogOut() {
        props.appProps.userHasAuthenticated(false);
    }

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const notes = ["волаовавава", "djdfkdjf", "lskfjisafasHgyu sigfisf siufsfisa", "ks;lsk dsiod"];
    const [searchStr, setSearchStr] = React.useState("");
    const handleChange = event => {
        setSearchStr(event.target.value);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="static"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                elevation="false"
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <MuiLink color='inherit' component={Link} to="/" underline="none"
                             variant='h4' className={classes.title}>ShareNotes</MuiLink>
                    <nav className={classes.nav}>
                        <Button color="inherit" variant='outlined' onClick={handleLogOut}>Выйти</Button>
                    </nav>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <TextField placeholder="Поиск" type="search" fullWidth value={searchStr} onChange={handleChange}
                           className={classes.search}/>
                <List className={classes.list}>
                    <NotesListItems notes={notes.filter(note => note.startsWith(searchStr))}/>
                </List>
            </Drawer>
        </div>
    );
}

function AppToolbar(props) {
    if (props.appProps.isAuthenticated === true) {
        return <LogOut props/>
    } else if (props.appProps.isAuthenticated === false) {
        return <Home props/>
    }
}

export default AppToolbar;
