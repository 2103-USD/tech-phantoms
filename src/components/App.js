import React, { useState, useEffect } from 'react';
import { Link, Router, Switch } from 'react-router-dom';
import {
	getCurrentUser,
	storeCurrentUser,
	getCurrentToken,
	clearCurrentUser,
} from '../auth';
import { getSomething } from '../api';
import { NavBar, AllProducts } from '../components';

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
		<Router>
			<nav>
				<NavBar currentUser />
			</nav>
			<div className="App">
				<h1>Welcome to Grace Shopper</h1>
				<h2>The place to buy your products!</h2>
				<Switch>
					<Route path="/products">
						<AllProducts products={products} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
