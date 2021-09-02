import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export const Product = ({ product }) => {
	const { id, name, description, price, imageURL, inStock, category } =
		product;

	return (
		<div id={`product${id}`} className="product-card">
			<Link to={`/product/${id}`}>
				<h3>{name}</h3>
			</Link>
			<img src={imageURL} alt="product" />
			<h4>Product Information</h4>
			<p>Category: {category}</p>
			<p>description: {description}</p>
			<p>Price: ${price}</p>
			<p>In Stock: {inStock}</p>
		</div>
	);
};

export default Product;
