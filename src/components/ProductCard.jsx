import React from 'react';
import { addItemToCart, GetCurrentCart } from '../api';
import { useParams, Link } from 'react-router-dom';
import './style.css';

export const ProductCard = ({ product }) => {

	const { id, name, description, price, imageURL, inStock, category } =
		product;

        const productId = product.id

	const addProductToCart = async () => {
       const cartItem = await addItemToCart(productId, price, '1', GetCurrentCart());
		console.log('cartitem', cartItem)
       if(cartItem) {
        alert('Product successfully added to cart!') 
     } else {
         alert('Error adding product to cart!')
     }
	};

	return (
		<div id={`product${id}`} className="product-card">
			<Link
				to={`/product/${id}`}
				style={{
					textDecoration: 'none',
					color: '#053F5F',
				}}
			>
				<h3>{name}</h3>
			</Link>

			<img src={imageURL} alt="product" />
			<h4>Product Information</h4>
			<p>Category: {category}</p>
			<p>Description: {description}</p>
			<p>Price: ${price}</p>
			<p>In Stock: {inStock}</p>
			<br></br>
			<span>Add to Cart</span>
			<button
				className="quantity-button"
				style={{ backgroundColor: '#84f01e' }}
                onClick={addProductToCart}
			>
				+
			</button>
		</div>
	);
};
