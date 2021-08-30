import React from "react";
import "./Profil.scss";
import {Redirect} from "react-router-dom";

const Header = () => {
    if (sessionStorage.getItem("id") == null ) {
        return <Redirect to="/"></Redirect>;
    }
    return (
        <p>ok</p>
    )
    
};

export default Header;
