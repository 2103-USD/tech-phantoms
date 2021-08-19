import React from 'react';

import {
  getSomething
} from '../api';

const Products = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <h1>Products</h1>
      <h2>{ message }</h2>
      
    </div>
  );
}

export default Products;