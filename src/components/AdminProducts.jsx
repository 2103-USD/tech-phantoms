import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api";
import "./style.css";

export const AdminProducts = () => {
    const [siteProducts, setSiteProducts] = useState([getAllProducts()]);

    const handleProducts = async () => {
        const res = await getAllProducts();
        if (res.length > 0) setSiteProducts(res);
    };

    useEffect(() => {
        handleProducts();
    }, []);

    return (
        <div className="admin-users">
            <h3>Products currently listed on the site:</h3>
            <br/>
            <br/>
            <div>
                <table className="productList">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {siteProducts.map(({id, name, description, price, imageURL, inStock, category }) => {
                            return( 
                            <tr key={`ProductList${id}`}>
                                <td>{id}</td>
                                <td>{category}</td>
                                <td>{name}</td>
                                <td>${price}</td>
                                <td>{inStock}</td>
                                <td><Link to={`/Admin/Product/${id}`}>Edit item</Link></td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
