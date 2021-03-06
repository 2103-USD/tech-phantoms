import React from "react";
import moment from "moment";
import { GetCurrentUser } from "../api";
import "./style.css";

export const OrderCard = ({ order }) => {
    const { id, status, lastName, datePlaced, products, total, paymentURL } =
        order;
    const user = GetCurrentUser();
    const date = moment(datePlaced).format("MMMM Do YYYY");

    return (
        <>
            {user.lastName === lastName ? (
                <div id={`${id}`} className="admin-order-card">
                    <h3>Order #: {id}</h3>
                    {datePlaced ? <h3>Placed on: {date}</h3> : ""}
                    <h3>Status: {status.toUpperCase()}</h3>
                    {paymentURL ? (
                        <h3>
                            <a
                                href={paymentURL}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Order Receipt
                            </a>
                        </h3>
                    ) : (
                        ""
                    )}
                    {products ? (
                        <table className="orderProducts">
                            <thead>
                                <tr>
                                    <th>Quantity</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(
                                    ({
                                        orderProductId,
                                        name,
                                        quantity,
                                        price,
                                    }) => {
                                        return (
                                            <tr
                                                key={`OrderProductList${orderProductId}`}
                                            >
                                                <td>{quantity}</td>
                                                <td>{name}</td>
                                                <td>${price}</td>
                                                <td>${quantity * price}</td>
                                            </tr>
                                        );
                                    }
                                )}
                                {products ? (
                                    <tr>
                                        <td></td>
                                        <td>Grand Total:</td>
                                        <td></td>
                                        <td>${total}</td>
                                    </tr>
                                ) : (
                                    ""
                                )}
                            </tbody>
                        </table>
                    ) : (
                        ""
                    )}
                    <br />
                </div>
            ) : (
                ""
            )}
        </>
    );
};
