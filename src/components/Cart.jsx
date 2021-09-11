import React, { useState, useEffect } from 'react';
import {
	GetCurrentCart,
	getOpenCart,
	addItemToCart,
	getProduct,
	updateProductInOrder,
} from '../api';
import { useHistory } from 'react-router-dom';
import './style.css';

export const Cart = ({ user }) => {
	const [cart, setCart] = useState({});
	const history = useHistory();
	const [form, setForm] = useState({
		orderProductId: '',
		price: 0,
		quantity: 0,
	});
	const { id, status, userId, datePlaced, products } = cart;

	useEffect(() => {
		const callback = async () => {
			const _cart = await getOpenCart();
			setCart(_cart);
			setForm({ quantity: _cart.quantity });
		};
		callback();
	}, []);

	const handleInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDevault();
		try {
			const res = await updateProductInOrder({
				orderProductId: form.orderProductId,
				price: form.price,
				quantity: form.quantity,
			});
			setCart(res.cart);
			history.push('/cart');
		} catch (error) {
			throw error;
		}
	};

	return (
		<div>
			<div>
				{user ? (
					<div className="cart-products">
						<h2>{user.username}'s Cart</h2>
						{products?.map(
							({
								orderProductId,
								productId,
								orderId,
								price,
								quantity,
								name,
								description,
								inStock,
								category,
							}) => {
								return (
									<div key={`cartProduct${orderProductId}`}>
										<h2>Product: {name}</h2>
										<h2>price: {price}</h2>
										<h2>quantity: {quantity}</h2>
										<h2>description: {description}</h2>
										<h2>inStock: {inStock}</h2>
										<h2>category: {category}</h2>
									</div>
								);
							}
						)}
						{/* <form onSubmit={handleSubmit}>
								<label>Quantity</label>
								<input
									type="number"
									value={form.quantity}
									onChange={handleInput}
								/>
							</form> */}

						{/* <button
								className="quantity-button"
								style={{ backgroundColor: '#84f01e' }}
								onClick={addItemToCart(
									productId,
									price,
									'1',
									GetCurrentCart()
								)}
							>
								+
							</button>
							<button
								className="quantity-button"
								style={{ backgroundColor: '#f14e4e' }}
								onClick={addItemToCart(
									productId,
									price,
									'1',
									GetCurrentCart()
								)}
							>
								-
							</button> */}
						<button
							style={{
								backgroundColor: 'orange',
								margin: '5px',
							}}
							// onClick={}
						>
							Empty Cart
						</button>
					</div>
				) : (
					<>
						<h2>Cart</h2>
						{/* <Order cart={cart} setCart={setCart} /> */}
						<button
							style={{
								backgroundColor: 'orange',
								margin: '5px',
							}}
							// onClick={}
						>
							Empty Cart
						</button>
					</>
				)}
			</div>
		</div>
	);
};
