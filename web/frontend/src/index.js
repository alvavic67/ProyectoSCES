import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main";

const routing = (
  <Router>
    <Route exact path="/login" component={Login} />
    <Route path="/home" component={Main} />
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
