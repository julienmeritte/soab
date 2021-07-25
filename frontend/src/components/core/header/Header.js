import React from "react";
import Navbar from "./navbar/Navbar";
import "./Header.scss";


const Header = () => {
    return (
        <header>
            <div className={'logo'}>
                <img src="./soab_logo.png"/>
            </div>
            <Navbar />
        </header>
    )
};

export default Header;
