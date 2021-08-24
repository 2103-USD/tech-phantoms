import React, { useEffect, useState } from 'react';
import Product from './Product';
import { getAllProducts } from '../api';
import './AllProducts.css'

const AllProducts = () => {
	// Let's fetch some products and render them

	const [products, setProducts] = useState([]);

	const handleProducts = async () => {
		const res = await getAllProducts();
		console.log('this is res in handle', res)
		if (res.length > 0) setProducts(res);
	};

	useEffect(() => {
		handleProducts();
	}, []);

	console.log('these are the products', products)

	return (
		<div className="allProducts">
			<h1>Products:</h1>
			<div>
				{products.length && 
					products.map((product) => {
						console.log('this is the product from allproducts', product)
						return <Product key={product.id} product={product} />
					})}
			</div>
		</div>
	);
};

export default AllProducts;
