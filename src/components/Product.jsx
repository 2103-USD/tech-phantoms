import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export const Product = ({ product }) => {
	const { productId, name, description, price, imageURL, inStock, category } =
		product;

	console.log('this is a single product', product);

	return (
		<div id={productId} className="product-card">
			<Link to={`/product/${productId}`}>
				<h1>Product: {name}</h1>
			</Link>
			<img src={imageURL} alt="product" />
			<h2>Product Information</h2>
			<p>Category: {category}</p>
			<p>description: {description}</p>
			<p>Price: ${price}</p>
			<p>In Stock: {inStock}</p>
		</div>
	);
};

export default Product;
