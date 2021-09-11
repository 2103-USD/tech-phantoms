import React, { useState, useEffect } from 'react';
import {
	GetCurrentCart,
	GetCurrentUsername,
	getOpenCart,
	removeProductFromOrder,
	updateProductInOrder,
} from '../api';
import { useHistory } from 'react-router-dom';
import './style.css';

export const Cart = (props) => {
	const [cart, setCart] = useState({});
	const user = GetCurrentUsername();
	const history = useHistory();
	const { id, status, userId, datePlaced, products } = cart;
	console.log('this is the cart', cart);
	const orderId = GetCurrentCart();
	const [form, setForm] = useState({
		orderProductId: '',
		price: 0,
		quantity: cart.quantity,
	});

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
			const res = await updateProductInOrder(
				form.orderProductId,
				form.price,
				form.quantity
			);
			setCart(res.cart);
			history.push('/cart');
		} catch (error) {
			throw error;
		}
	};

	const handleRemove = async (e) => {
		e.persist();
		try {
			console.log('this is the remove product order id', e.target.id);

			const res = await removeProductFromOrder(e.target.id);
			console.log('this is the remove product order id', res);
			setCart(res.cart);
			history.push('/cart');
		} catch (error) {
			throw error;
		}
	};

	return (
		<div className="cart-products">
			<h2>{user}'s Cart</h2>
			<div key={`orderId${orderId}`}>
				<table className="cartList">
					<thead>
						<tr>
							<th>Order Product Id</th>
							<th>Product</th>
							<th>Category</th>
							<th>Description</th>
							<th>In Stock</th>
							<th>Price</th>
							<th>Quantity</th>
						</tr>
					</thead>
					<tbody>
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
									<tr key={`cartProduct${productId}`}>
										<td>{orderProductId}</td>
										<td>{name}</td>
										<td>{category}</td>
										<td>{description}</td>
										<td>{inStock}</td>
										<td>{price}</td>
										<td>
											<form onSubmit={handleSubmit}>
												<input
													name={`quantity${productId}`}
													type="number"
													min="1"
													defaultValue={quantity}
													value={form.quantity}
													onChange={handleInput}
												/>
											</form>
											<button
												type="submit"
												className="update-button"
											>
												Update Quantity
											</button>
											<button
												type="button"
												className="remove-button"
												id={orderProductId}
												onClick={handleRemove}
											>
												Remove Product
											</button>
										</td>
									</tr>
								);
							}
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
