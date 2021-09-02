import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './style.css';
import { NavBar, AllProducts, SingleProduct, Login, Register } from '.';

// export const [products, setProducts] = useState([]);

// useEffect(() => {
// 	setProducts().then((products) => {
// 		setProducts(products);
// 	})
// },[])

const App = () => {
	const [user, setUser] = useState('');
	return (
		<>
			<nav>
				<NavBar currentUser />
				<Route path="/login">
					{' '}
					<Login setUser={setUser} />
				</Route>
				<Route path="/register">
					{' '}
					<Register setUser={setUser} />
				</Route>
			</nav>
			<div className="App">
				<Switch>
					<Route path="/allproducts">
						<AllProducts />
					</Route>
					<Route path="/product/:id">
						<SingleProduct />
					</Route>
				</Switch>
			</div>
		</>
	);
};

export default App;
