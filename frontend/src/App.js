import React, {Fragment, useState, useEffect, Suspense, lazy} from "react";
import "./App.scss";
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/feature/home-page/HomePage";
import Register from "./components/feature/auth-pages/register-page/Register";
import Login from "./components/feature/auth-pages/login-page/Login";
import { Provider } from "react-redux";
import store from "./service/store";
import Alert from "./components/shared/alerts/alerts";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Game from "./components/feature/game-page/game";
import Header from "./components/core/header/Header";
import Footer from "./components/core/footer/Footer";


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
              <Header/>
                <div className={'main'}>
                    <Route exact path="/" component={HomePage}></Route>
                    <Alert></Alert>
                    <Suspense fallback={<div>Loading... </div>}>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/game" component={Game} />
                        </Switch>
                    </Suspense>
                </div>
              <Footer/>
            </Fragment>
          </Router>
        </Provider>
        
  );
};

export default App;
