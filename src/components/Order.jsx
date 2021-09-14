import React, { useState, useEffect } from 'react';
import { OrderCard } from '.';
import { getMyOrders } from '../api';
import './style.css';

export const Order = (props) => {
	const [orders, setOrders] = useState([getMyOrders()]);

	const handleOrders = async () => {
		const res = await getMyOrders();
        console.log("JSX RES", res)
		if (res.length > 0) setOrders(res);
	};

	useEffect(() => {
		handleOrders();
	}, []);

	return (
		<div className="admin-orders">
			<div>
				{orders.map((order) => {
					return (
						<OrderCard key={`orderList${order.id}`} order={order} />
					);
				})}
			</div>
		</div>
	);
};
