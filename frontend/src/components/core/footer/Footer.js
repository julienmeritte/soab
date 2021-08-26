import React from "react";
import "./Footer.scss";


const Footer = () => {
    return (
        <footer>
            <nav class="navbar navbar-expand-md w-100 navbar-dark bg-dark">
            <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2 mr-auto p-2">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link">Soab Project © Copyright 2021</a>
                    </li>
                    
                </ul>
            </div>
            <div class="mx-auto p-2">
                <a class="navbrand" href="">
                    <img src="./soab_logo.png" width="125" height="65"/>
                </a>
            </div>
        </nav>
        </footer>
    )
};

export default Footer;