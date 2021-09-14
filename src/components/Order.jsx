import React, { useState, useEffect } from 'react';
import { OrderCard } from '.';
import { getAllOrders } from '../api';
import './style.css';

export const Order = (props) => {
	const [orders, setOrders] = useState([getAllOrders()]);

	const handleOrders = async () => {
		const res = await getAllOrders();
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
