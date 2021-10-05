import React from "react";
import "./Header.scss";
import {logout} from "../../../actions/auth";
import {connect} from "react-redux";
import PropTypes from "prop-types";


const Header = ({logout}) => {
    const onDisconnect = async () => {
        logout();
        window.location.reload();
      };


    if (sessionStorage.getItem("id") == null) {
        return (
            <nav class="navbar navbar-expand-md navbar-dark bg-dark">
                <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2 p-2">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/game">Games</a>
                        </li>
                    </ul>
                </div>
                <div class="navbar-collapse collapse w-100 order-2 dual-collapse2 mx-auto p-2">
                    <a class="navbrand" href="/">
                        <img src="./soab_logo.png" width="125" height="65"/>
                    </a>
                </div>
                <div class="navbar-collapse collapse order-3 dual-collapse2 ml-auto p-2">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/register">Register</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
    else {
        return (
            <nav class="navbar navbar-expand-md navbar-dark bg-dark">
                <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2 p-2">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/game">Games</a>
                        </li>
                    </ul>
                </div>
                <div class="navbar-collapse collapse w-100 order-2 dual-collapse2 mx-auto p-2">
                    <a class="navbrand" href="/">
                        <img src="./soab_logo.png" width="125" height="65"/>
                    </a>
                </div>
                <div class="navbar-collapse collapse order-3 dual-collapse2 ml-auto p-2">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/profile">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={() => onDisconnect()}>Disconnect</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
    
};

Header.propTypes = {
    logout: PropTypes.func.isRequired,
};

const mapStateProps = (state) => ({
});

export default connect( mapStateProps,{logout})(Header);
