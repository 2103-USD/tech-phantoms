import React from "react";
import { Link } from "react-router-dom";
import { getSpecificUser } from "../api";
import "./style.css";

export const AdminOrderCard = ({ order }) => {
    const { orderId, status, userId, datePlaced } = order;

    // const user = await getSpecificUser(userId);

    return (
        <div id={`${orderId}`} className="admin-order-card">
            <h3>Order #: {orderId}</h3>
            <h3>Order Date: {datePlaced}</h3>
            <h3>
                {/* Ordered By: {user.lastName}, {user.firstName} */}
            </h3>
            {/* <h3>{user.email}</h3> */}
            <h3>Status: {status}</h3>
        </div>
    );
};
