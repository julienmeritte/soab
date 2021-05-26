import React, { Fragment, useState } from "react";
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

const App = () => (
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
          <Route exact Path="/register" component={Register}></Route>
          <Route exact Path="/login" component={Login}></Route>
        </Switch>

        <footer>
          <h1>FOOTER in App.js</h1>
        </footer>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
