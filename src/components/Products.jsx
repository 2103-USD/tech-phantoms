import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getAllProducts } from "../api";
import "./style.css";

export const Products = () => {
    const [products, setProducts] = useState([]);

    const handleProducts = async () => {
        const res = await getAllProducts();
        if (res.length > 0) setProducts(res);
    };

    useEffect(() => {
        handleProducts();
    }, []);

    return (
        <div className="products">
            {" "}
            <h1>Welcome to Grace Shopper</h1>
            <h2>The place to buy your products!</h2>
            <h1>Products:</h1>
            <div className="products-body">
                <br></br>

                {products.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </div>
        </div>
    );
};
