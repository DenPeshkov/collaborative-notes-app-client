import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home/Home";
import PageNotFound from "./containers/PageNotFound/PageNotFound";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route>
                <PageNotFound/>
            </Route>
        </Switch>
    );
}