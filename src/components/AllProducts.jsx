import React, { useEffect, useState } from 'react';
import { Product } from '.';
import {getProducts} from '../api'


const AllProducts = () => {
// Let's fetch some products and render them

	const [products, setProducts] = useState([]);

	const handleProducts = async () => {
		const res = await getProducts();
		if (res) setProducts(res);
	};

    useEffect(() => {
        handleProducts();
    }, [])


	return (
		<div className="allProducts">
			<h1>Products:</h1>
			<div>
				{!!products.length && products.map((product) => (
					<Product key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default AllProducts;
