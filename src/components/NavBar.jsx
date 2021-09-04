import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

export const NavBar = ({ currentUser }) => {
    if (currentUser) {
        return (
            <nav className="nav-bar">
                <NavLink to="/" className="nav-item">
                    Home
                </NavLink>
                <NavLink to="/products" className="nav-item">
                    Products
                </NavLink>
                <NavLink to="/login" className="nav-item">
                    Login
                </NavLink>
                <NavLink to="/register" className="nav-item">
                    Register
                </NavLink>
            </nav>
        );
    } else {
        return (
            <nav>
                <NavLink to="/products">Products</NavLink>
            </nav>
        );
    }
};
