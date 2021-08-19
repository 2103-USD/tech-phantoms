import React from 'react';
import { Link } from 'react-router-dom';
import {
	getCurrentUser,
	storeCurrentUser,
	getCurrentToken,
	clearCurrentUser,
} from '../auth';

const Product = ({ product }) => {
	const { productId, name, description, price, imageURL, inStock, category } =
		product;
	return (
		<div id={productId} className="product-card">
			<Link to={`/product/${productId}`}>
				<h1>Product: {name}</h1>
			</Link>
			<img src={imageURL} alt="product image" />
			<h2>Product Information</h2>
			<p>Category: {category}</p>
			<p>description: {description}</p>
			<p>Price: ${price}</p>
			<p>In Stock: {inStock}</p>
		</div>
	);
};

export default Product;
