import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../../../actions/auth";
import HomePage from "../../../feature/home-page/HomePage";
import Login from "../../../feature/auth-pages/login-page/Login";
import Register from "../../../feature/auth-pages/register-page/Register";
import Game from "../../../feature/game-page/game";
import "./NavBar.scss";

const Navbar = ({auth: {isAuthenticated}, logout}) => {
    const authLinks = (
        <ul>
            <li>
                <a onClick={logout} href="/">
                    Déconnexion
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/register">Inscription</Link>
            </li>
            <li>
                <Link to="/login">Connexion</Link>
            </li>
        </ul>
    );
    return (

        <div className={'redirection'}>
            <form className={'btn'} action={"/"} component={HomePage}>
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
    )
        ;
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateProps, {logout})(Navbar);
