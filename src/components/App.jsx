import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { getSomething } from '../api';
import { NavBar, AllProducts } from '.';

const App = () => {
	const [message, setMessage] = useState('');

	useEffect(() => {
		getSomething()
			.then((response) => {
				setMessage(response.message);
			})
			.catch((error) => {
				setMessage(error.message);
			});
	});

	return (
        <>
			<nav>
				<NavBar currentUser />
			</nav>
			<div className="App">
				<h1>Welcome to Grace Shopper</h1>
				<h2>The place to buy your products!</h2>
				<Switch>
					<Route path="/products">
						<AllProducts />
					</Route>
				</Switch>
			</div>
        </>
	);
};

export default App;


// all products should just contain products
// !!products.length && is the same as 