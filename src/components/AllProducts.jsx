import React from 'react';
import { Link } from 'react-router-dom';
import {
	getCurrentUser,
	storeCurrentUser,
	getCurrentToken,
	clearCurrentUser,
} from '../auth';
import { Product } from './Product.jsx';

const AllProducts = ({ products }) => {
	const [products, setProducts] = useState([]);
	const handleProducts = async () => {
		const res = await getProducts();
		if (res) setProducts(res);
	};

	return (
		<div className="allProducts">
			<h1>Products:</h1>
			<div>
				{products.map((product) => (
					<Product key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default AllProducts;
