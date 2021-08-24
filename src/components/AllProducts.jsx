import React, { useEffect, useState } from 'react';
import Product from './Product';
import { getAllProducts } from '../api';
import './style.css';

const AllProducts = () => {
	const [products, setProducts] = useState([]);

	const handleProducts = async () => {
		const res = await getAllProducts();
		if (res.length > 0) setProducts(res);
	};

	useEffect(() => {
		handleProducts();
	}, []);

	return (
		<div className="allProducts">
			<h1>Products:</h1>
			<div>
				{products.length &&
					products.map((product) => {
						return <Product key={product.id} product={product} />;
					})}
			</div>
		</div>
	);
};

export default AllProducts;
