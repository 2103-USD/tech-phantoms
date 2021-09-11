import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GetCurrentUser } from '../api';
import './style.css';
import {
	Header,
	NavBar,
	Products,
	Product,
	Login,
	Register,
	FeaturedItems,
	Footer,
	AdminOrders,
	AdminOrder,
	AdminUsers,
	AdminUser,
	AdminProducts,
	AdminProduct,
	Cart,
	Checkout,
	Order,
} from '.';

// export const [products, setProducts] = useState([]);

// useEffect(() => {
// 	setProducts().then((products) => {
// 		setProducts(products);
// 	})
// },[])

export const App = () => {
	const [user, setUser] = useState(GetCurrentUser());
	return (
		<>
			<>
				<Header />
			</>
			<nav>
				<NavBar user={user} setUser={setUser} />
				<Route exact path="/login">
					{' '}
					<Login setUser={setUser} />
				</Route>
				<Route exact path="/register">
					{' '}
					<Register setUser={setUser} />
				</Route>
			</nav>
			<div className="App">
				<Switch>
					<Route exact path="/">
						<h1>Welcome to the Student Store!</h1>
						<FeaturedItems />
					</Route>
					<Route exact path="/products">
						<Products user={user} />
					</Route>
					<Route exact path="/product/:productId">
						<Product user={user} />
					</Route>
					<Route exact path="/admin/products">
						<AdminProducts />
					</Route>
					<Route exact path="/admin/product/:productId">
						<AdminProduct />
					</Route>
					<Route exact path="/admin/orders">
						<AdminOrders />
					</Route>
					<Route exact path="/admin/users">
						<AdminUsers />
					</Route>
					<Route exact path="/admin/user/:userId">
						<AdminUser />
					</Route>
					{/* <Route exact path="/admin/order/:orderId">
						<AdminOrder />
					</Route> */}
					<Route exact path="/cart">
						<Cart />
					</Route>
					<Route exact path="/checkout">
						<Checkout />
					</Route>{' '}
					<Route exact path="/orders">
						<Order />
					</Route>
				</Switch>
			</div>
			<footer>
				<Footer />
			</footer>
		</>
	);
};
