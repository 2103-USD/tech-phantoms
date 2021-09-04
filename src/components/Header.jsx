import React from "react";
import "./style.css";

export const Header = () => {
    return (
        <div className="header">
            <img
                className="header-item"
                src={require("../img/cajonvalleylogo.png")}
                alt="Cajon Valley Logo"
                width="300px"
                height="300px"
            />
            <h1 className="header-item">Cajon Valley Student Store</h1>
        </div>
    );
};
