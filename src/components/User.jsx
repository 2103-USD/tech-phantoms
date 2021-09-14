import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getOrdersByUserId } from '../api/orders';
import './style.css';

export default function User({ user, token, orders, setOrders }) {
    const getUserOrders = async () => {
      try {
        const allOrders = await getOrdersByUserId(user.id, token);
  
        setOrders(allOrders);
      } catch (error) {
        throw error;
      };
    };

    useEffect(() => {
        getUserOrders();
      }, [user]);
    
      return <>
        <div className='user'>
        <h2>User Profile:</h2>
          <div key={user.id} className='user-card'>
            <div className='user-data'>
              <p className='description'>First Name: <u>{user.firstName}</u></p>
              <p className='description'>Last Name: <u>{user.lastName}</u></p>
              <p className='description'>Email: <u>{user.email}</u></p>
              {user.imageURL ? <img className='thumbnail' src={user.imageURL} /> : <div className='thumbnail'></div>}
            </div>
            <div key={user.id + 1} className='order-history'>
              <h2>Order History for {user.firstName} {user.lastName} </h2>
              {orders.length > 0 ? orders.map((order, indx) => {
                return <div key={order.id}>
                  <NavLink to={`/order/${order.id}`} className='button'>ORDER {indx + 1}: {order.status}</NavLink>
                </div>
              }) : <h2>No orders</h2>}
            </div>
          </div>
        </div>
      </>
    };    