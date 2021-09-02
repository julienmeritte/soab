import React, {Fragment, useState, useEffect, Suspense, lazy} from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/feature/home-page/HomePage";
import Register from "./components/feature/auth-pages/register-page/Register";
import Login from "./components/feature/auth-pages/login-page/Login";
import Profil from "./components/feature/profile-pages/Profil";
import { Provider } from "react-redux";
import store from "./service/store";
import Alert from "./components/shared/alerts/alerts";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Game from "./components/feature/game-page/GamePage";
import GameList from "./components/feature/gameList-page/gameListPage";
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
          <Router forceRefresh={true}>
            <Fragment>
              <Header/>
                <div className={'main'}>
                    <Route exact path="/" component={HomePage}></Route>
                    <Alert></Alert>
                    <Suspense fallback={<div>Loading... </div>}>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/game" component={GameList} />
                            <Route exact path="/Playgame" component={Game} />
                            <Route exact path="/profile" component={Profil} />
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
