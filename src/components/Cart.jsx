import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {
	GetCurrentCart,
	getOpenCart,
	removeProductFromOrder,
	updateProductInOrder,
    STRIPE_KEY,
    GetCurrentUser,
    emptyCurrentCart,
    updateOrderStatus,
    completeOrder,
    createNewOrder
} from '../api';
import './style.css';
import StripeCheckout from "react-stripe-checkout";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios';
import {BASE_URL, getHeaders, storeCurrentCart} from '../api/auth'

const StripeURL = `${BASE_URL}/stripe`;


export const Cart = (props) => {
    const history = useHistory();
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
            toast(`The item in your cart has been updated.`, { type: "success" });

			setCart(res);
		} catch (error) {
			throw error;
		}
	};

	const handleRemove = async (e) => {
			try {
				await removeProductFromOrder(e.target.id);
				const res = await getOpenCart();
                toast(`The item has been removed from your cart.`, { type: "success" });
				setCart(res);
			} catch (error) {
				throw error;
			}
	};

    const handleEmptyCart = async (e) => {
        try {
            await emptyCurrentCart(orderId);
            const res = await getOpenCart();
            toast(`Your cart has been emptied.`, { type: "success" });
            setCart(res);
        } catch (error) {
            throw error;
        }
    };

    const handleStripeToken = async (token) => {
        await updateOrderStatus(orderId, "processing")

        const URL = `${StripeURL}/pay`
        const {data} = await axios.post(`${URL}`, {
            token, total
        }, getHeaders());
        const status = data.status;

        if (status === "succeeded") {
            toast("Success! Your payment has been approved.\nFinalizing order....", { type: "success" });
            await completeOrder(orderId, data.id, data.source.brand, total, data.receipt_url)
            const newCart = await createNewOrder()
            storeCurrentCart(newCart)
            history.push("/orders")
        } else {
            if (data.decline_code === "stolen_card") {
                toast(`This is a stolen card.\nThe police are on their way.`, { type: "error" });    
            } else {
                toast(`Transaction failed. ${data.message}`, { type: "error" });
            }
            await updateOrderStatus(orderId, "created")
        }
        return data
      }

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
											<form onSubmit={handleSubmit} className="cart-form">
												<input
													name='quantity'
													type="number"
													min="1"
                                                    max={inStock}
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
                <button
                    className="remove-button"
                    id={`EmptyCartButton${orderId}`}
                    onClick={handleEmptyCart}
                >
                    Clear Cart
                </button> < br/ >
                <StripeCheckout
                    stripeKey={STRIPE_KEY}
                    token={handleStripeToken}
                    amount={total * 100}
                    name="Cajon Valley Student Store"
                    country="US"
                    email = {user.email}
                    billingAddress
                    shippingAddress
                />
			</div>
		</div>
	);
};
