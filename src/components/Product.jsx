import React, { useState, useEffect } from "react";
import { addItemToCart, getProduct, GetCurrentCart } from "../api";
import { useParams } from "react-router-dom";
import "./style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Product = ({ user }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const { id, name, description, price, imageURL, inStock, category } =
        product;

    useEffect(() => {
        const callback = async () => {
            const prod = await getProduct(productId);
            setProduct(prod);
        };
        callback();
    }, [productId]);

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
            toast("An error occurred.", { type: "error" });
        }
    };

    const pleaseLogin = async () => {
        toast("Please login to add products to cart", { type: "error" });
    };

    return (
        <div className="product-card-body-single">
            <div
                key={productId}
                id={`singleProduct${id}`}
                className="product-card-single"
            >
                <h3>{name}</h3>
                <img
                    src={imageURL}
                    alt="product"
                    className="product-card-pic-single"
                />
                <h4 className="product-info-single">Product Information</h4>
                <p>Category: {category}</p>
                <p>Description: {description}</p>
                <p>Price: ${price}</p>
                <p>In Stock: {inStock}</p>
                {user ? (
                    <>
                        <span>Add to Cart</span>
                        <button
                            className="quantity-button-single"
                            onClick={addProductToCart}
                        >
                            +
                        </button>
                    </>
                ) : (
                    <>
                        <span>Add to Cart</span>
                        <button
                            className="quantity-button-single"
                            onClick={pleaseLogin}
                        >
                            +
                        </button>
                    </>
                )}
                <div>
                    <button className="twitter-hashtag-button-large">
                        <a
                            href={
                                "https://twitter.com/intent/tweet?hashtags=CajonValley%2C&original_referer=https%3A%2F%2Fpublish.twitter.com%2F&text=Checkout%20" +
                                name
                            }
                            rel="noopener noreferrer"
                            target="_blank"
                            data-show-count="false"
                            className="twitter-hashtag-button-large"
                        >
                            Tweet #CajonValley
                        </a>
                        <script
                            async
                            src="https://platform.twitter.com/widgets.js"
                            charset="utf-8"
                        ></script>
                    </button>
                </div>
            </div>
        </div>
    );
};
