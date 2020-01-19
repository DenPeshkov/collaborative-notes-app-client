import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import NotFound from "./containers/NotFound";
import Notes from "./containers/Notes";
import AppliedRoute from "./components/AppliedRoute";

export default function Routes({appProps}) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps}/>
            <AppliedRoute path="/login" exact component={LogIn} appProps={appProps}/>
            <AppliedRoute path="/signup" exact component={SignUp} appProps={appProps}/>
            <AppliedRoute path="/notes" exact component={Notes} appProps={appProps}/>
            <Route component={NotFound}/>
        </Switch>
    );
}