import React from "react";
import moment from 'moment';
import { GetCurrentUser } from "../api";
import "./style.css";

export const OrderCard = ({ order }) => {
    const { id, status, firstName, lastName, email, datePlaced, products} = order;
    const user = GetCurrentUser();
    const date = moment(datePlaced).format('MMMM Do YYYY')
    return (
        <>
            {(user.lastName === lastName) ? (
                <div id={`${id}`} className="admin-order-card">
                    <h3>Order #: {id} Placed on: {date}</h3>
                    <h3>Ordered By: {lastName}, {firstName}</h3>
                    <h3>{email}</h3>
                    <h3>Status: {status}</h3>
                    {(products) ? 
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
                                {products.map(({orderProductId, name, quantity, price}) => {
                                    return(
                                        <tr key={`OrderProductList${orderProductId}`}>
                                            <td>{quantity}</td>
                                            <td>{name}</td>
                                            <td>${price}</td>
                                            <td>${quantity * price}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    : ""
                    }
                    <br />
                </div>
            ): ''}
        </>
        );
    };
