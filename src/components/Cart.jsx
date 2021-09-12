import React, { useState, useEffect } from 'react';
import {
	GetCurrentCart,
	getOpenCart,
	removeProductFromOrder,
	updateProductInOrder,
    STRIPE_KEY,
    handleStripeToken,
    GetCurrentUser
} from '../api';
import './style.css';
import StripeCheckout from "react-stripe-checkout";



export const Cart = (props) => {
	const [cart, setCart] = useState({});
	const { products, total } = cart || {};
    const user = GetCurrentUser();
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
                <h1>Your total is: ${total}</h1>
                <StripeCheckout
                    stripeKey={STRIPE_KEY}
                    token={handleStripeToken}
                    amount={total * 100}
                    name="Joel"
                    country="US"
                    email = {user.email}
                    billingAddress
                    shippingAddress
                />
			</div>
		</div>
	);
};
