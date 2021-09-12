import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getAllProducts } from "../api";
import "./style.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();
const options = [
    { value: "", label: "All" },
    { value: "Child Nutrition", label: "👩‍🍳 Child Nutrition" },
    { value: "Transportation", label: "🚌 Transportation" },
    { value: "Technology", label: "🧑‍💻 Technology" },
    { value: "Repair", label: "🧑‍🔧 Repair" },
];

export default function AnimatedMulti() {
    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
        />
    );
}

export const Products = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [selectedCategory] = useState();

    const handleProducts = async (e) => {
        console.log(e);
        const res = await getAllProducts();
        if (e && e.value > "") {
            const filteredRes = res.filter(
                (product) => product.category === e.value
            );
            setProducts(filteredRes);
        } else {
            if (res.length > 0) setProducts(res);
        }
    };

    useEffect(() => {
        handleProducts();
    }, []);

    function customTheme(theme) {
        return {
            ...theme,
            colors: {
                primary25: "#B7C5DA",
            },
        };
    }
    return (
        <div className="App">
            <div className="products">
                <h2>
                    PRODUCTS
                    <>
                        <Select
                            Input
                            onChange={handleProducts}
                            value={selectedCategory}
                            isOptionDisabled={(options) => options.isDisabled}
                            type="select"
                            name="select"
                            id="selectedCategory"
                            components={makeAnimated()}
                            theme={customTheme}
                            options={options}
                            placeholder="Category Filter"
                            autoFocus
                            isSearchable
                            noOptionsMessage={() =>
                                "No other categories available"
                            }
                        />
                    </>
                </h2>
                <p className="stock-filter">
                    <input type="checkbox" /> Only show products in stock
                </p>
                <div className="products-body">
                    {products.map((filteredRes) => {
                        return (
                            <ProductCard
                                key={filteredRes.id}
                                product={filteredRes}
                                user={user}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
