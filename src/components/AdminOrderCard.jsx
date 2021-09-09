import React from "react";
import { Link } from "react-router-dom";
import { getSpecificUser } from "../api";
import "./style.css";

export const AdminOrderCard = ({ order }) => {
    const { id, status, userId, datePlaced } = order;

    // const user = await getSpecificUser(userId);

    return (
        <div id={`${id}`} className="admin-order-card">
            <h3>Order #: {id}</h3>
            <h3>Order Date: {datePlaced}</h3>
            <h3>
                {/* Ordered By: {user.lastName}, {user.firstName} */}
            </h3>
            {/* <h3>{user.email}</h3> */}
            <h3>Status: {status}</h3>
        </div>
    );
};
