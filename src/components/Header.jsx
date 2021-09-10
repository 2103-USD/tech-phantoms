import React from "react";
import "./style.css";

export const Header = () => {
    return (
        <header className="header">
            <img
                className="header-logo"
                src={require("../img/cajonvalleylogo.png")}
                alt="Cajon Valley Logo"
            />
            <h1 className="header-item">Cajon Valley Student Store</h1>
        </header>
    );
};
