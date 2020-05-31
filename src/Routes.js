import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home/Home";
import PageNotFound from "./containers/PageNotFound/PageNotFound";
import SignIn from "./containers/Auth/SignIn";
import SignUp from "./containers/Auth/SignUp";
import CodeVerification from "./containers/Auth/CodeVerification";
import Editor from "./containers/Editor/Editor";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/signin">
                <SignIn/>
            </Route>
            <Route exact path="/signup">
                <SignUp/>
            </Route>
            <Route exact path="/forgotpassword">
                <CodeVerification/>
            </Route>
            <Route exact path="/registrationcode">
                <CodeVerification/>
            </Route>
            <Route exact path="/editor">
                <Editor/>
            </Route>
            <Route>
                <PageNotFound/>
            </Route>
        </Switch>
    );
}