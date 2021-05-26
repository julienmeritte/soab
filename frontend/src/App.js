import React, { Fragment, useState, useEffect } from "react";
import "./App.scss";
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/feature/home-page/HomePage";
import Navbar from "./components/core/header/Navbar";
import Register from "./components/feature/auth-pages/register-page/Register";
import Login from "./components/feature/auth-pages/login-page/Login";
import { Provider } from "react-redux";
import store from "./service/store";
import Alert from "./components/shared/alerts/alerts";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Game from "./components/feature/game-page/game";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <header>
            <Navbar />
            <a href="/auth/google">Connect with Google.</a>
          </header>
          <Route exact path="/" component={HomePage}></Route>
          <Alert></Alert>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/game" component={Game} />
          </Switch>

          <footer>
            <h1>FOOTER in App.js</h1>
          </footer>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
