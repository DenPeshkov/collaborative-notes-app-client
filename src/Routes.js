import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import NotFound from "./containers/NotFound";
import Notes from "./containers/Notes";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={LogIn}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/notes" exact component={Notes}/>
            <Route component={NotFound}/>
        </Switch>
    );
}