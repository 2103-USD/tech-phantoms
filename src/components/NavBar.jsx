import React from "react";
import { NavLink, Link } from "react-router-dom";
import {clearCurrentUser} from '../api/auth'
import "./style.css";

export const NavBar = ({ user, setUser }) => {

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            clearCurrentUser()
            setUser(null);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <nav className="nav-bar">
            <NavLink to="/" className="nav-item">
                Home
            </NavLink>
            <NavLink to="/products" className="nav-item">
                Products
            </NavLink>
            { user ?
                (
                    <>
                        { (user.isAdmin) ?
                            (
                                <>
                                    <NavLink to="/AdminOrders" className="nav-item">
                                        View All Orders
                                    </NavLink>
                                </>
                            )
                            : ""
                        }

                        <Link to="/" className="nav-item" onClick={handleLogOut}>
                            Logout
                        </Link>
                        <h1>Welcome back, {user.username}</h1>
                    </>
                )
                : (
                    <>
                        <NavLink to="/login" className="nav-item">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="nav-item">
                            Register
                        </NavLink>
                    </>
                )
            }
            
        </nav>
    );
};
