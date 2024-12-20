import React, { Fragment, useState, useEffect } from "react";
import './App.scss';
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
            <div className={'logo'}>
              <img src="./soab_logo.png" />
            </div>
            <div className={'redirection'}>
              <form className={'btn'} action={"/"} component={HomePage}>
                <button>Home</button>
              </form>
              <form className={'btn'} action={"/login"} component={Login}>
                <button>Login</button>
              </form>
              <form className={'btn'} action={"/register"} component={Register}>
                <button>Register</button>
              </form>
              <form className={'btn'} action={"/game"} component={Game}>
                <button>Game</button>
              </form>
              <form className={'btn'} action={"/auth/google"}>
                <button>Connect with Google.</button>
              </form>
            </div>
          </header>
          <Route exact path="/" component={HomePage}></Route>
          <Alert></Alert>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/game" component={Game} />
          </Switch>
          <footer>
            <h1>Ici c'est le footer !</h1>
          </footer>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
