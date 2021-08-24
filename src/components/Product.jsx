import React, { Link } from 'react';

export const Product = ({ product }) => {
	const { productId, name, description, price, imageURL, inStock, category } =
		product;

	// return (
	// 	<div className="product">
	// 		<h1>Product</h1>
	// 		<h2></h2>
	// 		<h3> {JSON.stringify(product)}</h3>
	// 	</div>
	// );

	return (
		<div id={productId} className="product-card">
			<Link to={`/product/${productId}`}>
				<h1>Product: {name}</h1>
			</Link>
			<img src={imageURL} alt='product' />
			<h2>Product Information</h2>
			<p>Category: {category}</p>
			<p>description: {description}</p>
			<p>Price: ${price}</p>
			<p>In Stock: {inStock}</p>
		</div>
	);



};
