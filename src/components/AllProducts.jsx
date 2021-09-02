import React, { useEffect, useState } from 'react';
import Product from './Product';
import { getAllProducts } from '../api';
import './style.css';

const AllProducts = () => {
	const [allProducts, setAllProducts] = useState([]);

	const handleProducts = async () => {
		const res = await getAllProducts();
		if (res.length > 0) setAllProducts(res);
	};

	useEffect(() => {
		handleProducts();
	}, []);

	return (
		<div className="allProducts">
			{' '}
			<h1>Welcome to Grace Shopper</h1>
			<h2>The place to buy your products!</h2>
			<h1>Products:</h1>
			<div>
				{!!allProducts.length &&
					allProducts.map((product) => {
						return <Product key={product.id} product={product} />;
					})}
			</div>
		</div>
	);
};

export default AllProducts;
