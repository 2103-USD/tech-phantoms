import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	GetCurrentCart,
	getOpenCart,
	removeProductFromOrder,
	updateProductInOrder,
} from '../api';
import './style.css';

export const Cart = (props) => {
	const [cart, setCart] = useState({});
	const { id, status, userId, datePlaced, products } = cart || {};
	const orderId = GetCurrentCart();
	const [form, setForm] = useState({
		orderProductId: '',
		quantity: cart?.quantity,
	});

	useEffect(() => {
		const callback = async () => {
			const _cart = await getOpenCart();
			setCart(_cart);
		};
		callback();
	}, []);

	const handleInput = (e, productId) => {
		setForm({ ...form, [e.target.name]: e.target.value, orderProductId: productId });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log('this is the form', form)
			await updateProductInOrder(
				form.orderProductId,
				Number(form.quantity)
			);
			const res = await getOpenCart();

			setCart(res);
		} catch (error) {
			throw error;
		}
	};

	const handleRemove = async (e) => {
			try {
				console.log('this is the remove product order id', e.target.id);

				await removeProductFromOrder(e.target.id);
				const res = await getOpenCart();

				setCart(res);
			} catch (error) {
				throw error;
			}
	};

	return (
		<div className="cart-products">
			<h2>Your Cart!</h2>
			<Link to='/checkout'><button className='checkout-button' >Checkout</button></Link>
			<div key={`orderId${orderId}`}>
				<table className="cartList">
					<thead>
						<tr>
							<th>Product</th>
							<th>Category</th>
							<th>Description</th>
							<th>In Stock</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Total</th>
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
										<td>{name}</td>
										<td>{category}</td>
										<td>{description}</td>
										<td>{inStock}</td>
										<td>${price}</td>
										<td>
											<form onSubmit={handleSubmit}>
												<input
													name='quantity'
													type="number"
													min="1"
													defaultValue={quantity}
													// value={form.quantity}
													onChange={(e) => handleInput(e, orderProductId)}
												/>
											<br></br>
											<button
												type="submit"
												className="update-button"
											>
												Update Quantity
											</button>
											</form>
											<button
												className="remove-button"
												id={orderProductId}
												onClick={handleRemove}
											>
												Remove Product
											</button>
										</td>
										<td>${quantity * price}</td>
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
