import React, { useState } from "react";
import { getProduct } from "../api";
import { useParams } from "react-router-dom";

import "./style.css";

export const SingleProduct = (props) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(getProduct(productId));

    console.log("are we getting the productId =>", productId);
    console.log("this is the product we fetched => ", product);

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
