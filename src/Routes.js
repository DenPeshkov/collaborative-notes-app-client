import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import NotFound from "./containers/NotFound";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={LogIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route component={NotFound} />
        </Switch>
    );
}