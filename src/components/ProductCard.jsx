import React from "react";

import { Link } from "react-router-dom";

import "./style.css";

export const ProductCard = ({ product }) => {
    const { id, name, description, price, imageURL, inStock, category } =
        product;

    return (
        <div id={`product${id}`} className="product-card">
            <Link
                to={`/product/${id}`}
                style={{
                    textDecoration: "none",
                    color: "#053F5F",
                }}
            >
                <h3>{name}</h3>
            </Link>
            <br></br>
            <img src={imageURL} alt="product" />
            <h4>Product Information</h4>
            <p>Category: {category}</p>
            <p>Description: {description}</p>
            <p>Price: ${price}</p>
            <p>In Stock: {inStock}</p>
            <br></br>
            <span>Quantity</span>
            <button
                className="quantity-button"
                style={{ backgroundColor: "#84f01e" }}
            >
                +
                {/* // onClick={() => props.updateCartHandler(product.id, +1)}>  */}
            </button>

            {/* {product.qty} */}

            <button
                className="quantity-button"
                style={{ backgroundColor: "#f14e4e" }}
                //   onClick={() => props.updateCartHandler(product.id, -1)}
            >
                -
            </button>
        </div>
    );
};
