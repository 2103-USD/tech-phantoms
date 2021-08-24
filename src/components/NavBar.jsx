import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'

export const NavBar = ({ currentUser }) => {
	if (currentUser) {
		return (
			<nav className='navBar'>
				<NavLink to="/products">All Products</NavLink>
			</nav>
		);
	} else {
		return (
			<nav>
				<NavLink to="/products">All Products</NavLink>
			</nav>
		);
	}
};

export default NavBar;
