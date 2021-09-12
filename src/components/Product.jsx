import React, { useState, useEffect } from 'react';
import { addItemToCart, getProduct, GetCurrentCart } from '../api';
import { useParams } from 'react-router-dom';
import './style.css';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export const Product = ({ user }) => {
	const { productId } = useParams();
	const [product, setProduct] = useState([]);
	const { id, name, description, price, imageURL, inStock, category } =
		product;

	useEffect(() => {
		const callback = async () => {
			const prod = await getProduct(productId);
			setProduct(prod);
		};
		callback();
	}, [productId]);

	const addProductToCart = async () => {
		const cartItem = await addItemToCart(
			productId,
			price,
			'1',
			GetCurrentCart()
		);

		if (cartItem) {
            toast(`${name} has been added to your cart`, { type: "success" });
		} else {
            toast("An error occured.", { type: "error" });
		}
	};

	const pleaseLogin = async () => {
		toast('Please login to add products to cart', { type: 'error' });
	};


	return (
		<div className="product-card-body">
			<div key={productId} id={`singleProduct${id}`} className="product-card">
				<h3>{name}</h3>
				<img src={imageURL} alt="product" />
				<h4>Product Information</h4>
				<p>Category: {category}</p>
				<p>description: {description}</p>
				<p>Price: ${price}</p>
				<p>In Stock: {inStock}</p>
				{user ? (
					<>
						<span>Add to Cart</span>
						<button
							className="quantity-button"
							style={{ backgroundColor: '#84f01e' }}
							onClick={addProductToCart}
						>
							+
						</button>
					</>
				) : (
					<>
					<span>Add to Cart</span>
					<button
						className="quantity-button"
						style={{ backgroundColor: '#84f01e' }}
						onClick={pleaseLogin}
					>
						+
					</button>
				</>
				)}
			</div>
		</div>
	);
};
