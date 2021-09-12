import React from "react";
import { addItemToCart, GetCurrentCart } from "../api";
import { Link } from "react-router-dom";
import "./style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProductCard = ({ product, user }) => {
    const { id, name, description, price, imageURL, inStock, category } =
        product;

    const productId = product.id;

    const addProductToCart = async () => {
        const cartItem = await addItemToCart(
            productId,
            price,
            "1",
            GetCurrentCart()
        );

        if (cartItem) {
            toast(`${name} has been added to your cart`, { type: "success" });
        } else {
            toast("An error occured.", { type: "error" });
        }
    };

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

            <img src={imageURL} alt="product" />
            <h4>Product Information</h4>
            <p>Category: {category}</p>
            <p>Description: {description}</p>
            <p>Price: ${price}</p>
            <p>In Stock: {inStock}</p>
            <br></br>
            <div className="add-to-cart">
                {user ? (
                    <>
                        <span>Add to Cart</span>
                        <button
                            className="quantity-button"
                            onClick={addProductToCart}
                        >
                            +
                        </button>
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};
