import React, { useState } from 'react';
import { Router, NavLink } from 'react-router-dom';

export const NavBar = ({ currentUser }) => {
	if (currentUser) {
		return (
			<div>
				<NavLink to="/products">All Products</NavLink>
			</div>
		);
	} else {
        return (
			<div>
				<NavLink to="/products">All Products</NavLink>
			</div>
		);
	}
};

export default NavBar;