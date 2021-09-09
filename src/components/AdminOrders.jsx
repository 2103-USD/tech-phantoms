import React, { useEffect, useState } from "react";
import { getAllOrders } from "../api";
import "./style.css";
import { AdminOrderCard } from "./AdminOrderCard";

export const AdminOrders = ({ currentUser }) => {
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
                    return <AdminOrderCard key={`orderList${order.id}`} order={order} />;
                })}
            </div>
        </div>
    );
};
