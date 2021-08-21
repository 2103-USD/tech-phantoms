import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = ({ currentUser }) => {
	if (currentUser) {
		return (
			<nav>
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