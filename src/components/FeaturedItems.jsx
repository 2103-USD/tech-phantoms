import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api";
import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const FeaturedItems = () => {
    const [products, setProducts] = useState([]);

    const handleProducts = async () => {
        const res = await getAllProducts();
        if (res.length > 0) setProducts(res);
    };

    useEffect(() => {
        handleProducts();
    }, []);

    const settings = {
        dots: true,
        className: "center",
        centerMode: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="featured-items-slider">
            <h2>Featured Items</h2>
            <Slider {...settings}>
                {products.map((product) => {
                    return (
                        <div key={product.id}>
                            <img
                                src={product.imageURL}
                                alt="product"
                                width="300px"
                                height="300px"
                            />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};
