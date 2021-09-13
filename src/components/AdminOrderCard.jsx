import React from "react";
import moment from "moment";
import "./style.css";

export const AdminOrderCard = ({ order }) => {
    const {
        id,
        status,
        firstName,
        lastName,
        email,
        datePlaced,
        products,
        total,
        paymentId,
        paymentType,
        paymentAmt,
        paymentURL,
    } = order;
    const date = moment(datePlaced).format("MMMM Do YYYY");
    return (
        <div id={`${id}`} className="admin-order-card">
            <h3>Order #: {id}</h3>
            {datePlaced ? <h3>Placed on: {date}</h3> : ""}
            <h3>
                Ordered By: {lastName}, {firstName}
            </h3>
            <h3>{email}</h3>
            {status ? <h3>Status: {status.toUpperCase()}</h3> : ""}
            {paymentURL ? (
                <table className="orderPayments">
                    <thead>
                        <tr>
                            <th>Pmt Type</th>
                            <th>Amount</th>
                            <th>Tran #</th>
                            <th>Receipt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={`orderPayments${id}`}>
                            <td>{paymentType}</td>
                            <td>${paymentAmt / 100}</td>
                            <td>{paymentId}</td>
                            <td>
                                <a
                                    href={paymentURL}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    Order Receipt
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                            ({ orderProductId, name, quantity, price }) => {
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
                        <tr>
                            <td></td>
                            <td>Grand Total:</td>
                            <td></td>
                            <td>${total}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                ""
            )}
            <br />
        </div>
    );
};
