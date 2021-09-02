import React, { useState, useEffect } from "react";
import { getProduct } from "../api";
import { useParams } from "react-router-dom";

import "./style.css";

export const SingleProduct = (props) => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const callback = async () => {
            const prod = await getProduct(productId);
            setProduct(prod);
        };
        callback();
    }, [productId]);

    const { id, name, description, price, imageURL, inStock, category } =
        product;

    return (
        <div key={productId} id={`singleProduct${id}`} className="product-card">
            <h3>{name}</h3>
            <img src={imageURL} alt="product" />
            <h4>Product Information</h4>
            <p>Category: {category}</p>
            <p>description: {description}</p>
            <p>Price: ${price}</p>
            <p>In Stock: {inStock}</p>
        </div>
    );
};
