import React, { useState } from 'react';

import { getSomething } from '../api';

export const Product = ({ product }) => {
	const [message, setMessage] = useState('');

	// useEffect(() => {
	//   getSomething()
	//     .then(response => {
	//       setMessage(response.message);
	//     })
	//     .catch(error => {
	//       setMessage(error.message);
	//     });
	// });

	return (
		<div className="Product">
			<h1>Product</h1>
			<h2>{message}</h2>
			<h3> {JSON.stringify(product)}</h3>
		</div>
	);
};
