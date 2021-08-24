import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { NavBar, AllProducts } from '.';

const App = () => {
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
