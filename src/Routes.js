import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Error from "./containers/Error";
import Signup from "./containers/Signup";
import Note from "./containers/Note";

export default function Routes() {
  return (
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/signup">
          <Signup/>
        </Route>>
        <Route exact path="/notes/:id">
          <Note/>
        </Route>
        <Route exact path="/error">
          <Error/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
  );
}