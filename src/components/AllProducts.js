import React from 'react';
import { Link } from 'react-router-dom';
import {
	getCurrentUser,
	storeCurrentUser,
	getCurrentToken,
	clearCurrentUser,
} from '../auth';
import Product from './Product.js';

const AllProducts = ({ products }) => {
	return (
		<div className="allProducts">
			<h1>Products:</h1>
			{products.map(
				({
					productId,
					name,
					description,
					price,
					imageURL,
					inStock,
					category,
				}) => (
					<div key={productId} className="product-card">
						<Link to={`/product/${productId}`}>
							<h3>Product: {name}</h3>
						</Link>
						<img src={imageURL} alt="product image" />
						<h2>Product Information</h2>
						<p>Category: {category}</p>
						<p>description: {description}</p>
						<p>Price: ${price}</p>
						<p>In Stock: {inStock}</p>
					</div>
				)
			)}
		</div>
	);
};

export default AllProducts;
