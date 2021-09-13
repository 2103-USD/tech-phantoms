import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { clearCurrentUser } from "../api/auth";
import queryString from "query-string";
import "./style.css";

export const NavBar = ({ user, setUser }) => {
    const history = useHistory();
    const [search, setSearch] = useState([]);
    const google = "https://www.google.com/search?q=site%3A";
    const site = "https://fast-savannah-33549.herokuapp.com/";

    const initiateSearch = async ({ query }) => {
        const searchString = queryString.parse(query.query);
        console.log(searchString);
        const url = google + site + "+" + query;
        const win = window.open(url, "_blank");
        win.focus();
    };

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            clearCurrentUser();
            setUser(null);
            history.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <nav className="nav-bar">
            <NavLink to="/" className="nav-item">
                Home
            </NavLink>
            <NavLink to="/products" className="nav-item">
                Products
            </NavLink>
            {user ? (
                <>
                    {user.isAdmin ? (
                        <>
                            <NavLink to="/Admin/Products" className="nav-item">
                                Manage Products
                            </NavLink>
                            <NavLink to="/Admin/Orders" className="nav-item">
                                View All Orders
                            </NavLink>
                            <NavLink to="/Admin/Users" className="nav-item">
                                View All Users
                            </NavLink>
                        </>
                    ) : (
                        ""
                    )}
                    <NavLink to="/orders" className="nav-item">
                        My Orders
                    </NavLink>
                    <Link to="/" className="nav-item" onClick={handleLogOut}>
                        Logout
                    </Link>
                    <input
                        type="text"
                        placeholder="Search . . ."
                        onChange={(event) => {
                            setSearch({ query: event.target.value });
                        }}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                initiateSearch(search);
                            }
                        }}
                        className="nav-item"
                        id="search"
                    ></input>

                    <h1 className="nav-title">
                        Welcome back, {user.firstName}!
                    </h1>

                    <NavLink to="/cart">
                        <img
                            className="shopping-cart"
                            src={require("../img/whitecart.png")}
                            alt="Shopping Cart"
                        />
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/login" className="nav-item">
                        Login
                    </NavLink>
                    <NavLink to="/register" className="nav-item">
                        Register
                    </NavLink>
                    <input
                        type="text"
                        placeholder="Search . . ."
                        className="nav-item"
                        id="search-no-login"
                    ></input>
                </>
            )}
        </nav>
    );
};
