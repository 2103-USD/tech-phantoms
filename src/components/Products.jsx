import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getAllProducts } from "../api";
import "./style.css";

export const Products = ({user}) => {
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
            <h2>Products:</h2>
            <div className="products-body">
                {products.map((product) => {
                    return <ProductCard key={product.id} product={product} user={user} />;
                })}
            </div>
        </div>
    );
};
