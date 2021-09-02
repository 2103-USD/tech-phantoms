import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

export const NavBar = ({ currentUser }) => {
	if (currentUser) {
		return (
			<nav className="navBar">
				<NavLink to="/allproducts">All Products</NavLink>
				<NavLink to='/login'>Login</NavLink>
				<NavLink to='/register'>Register</NavLink>

			</nav>
		);
	} else {
		return (
			<nav>
				<NavLink to="/allproducts">All Products</NavLink>
			</nav>
		);
	}
};

export default NavBar;
