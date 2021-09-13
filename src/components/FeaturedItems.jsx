import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api";
import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

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
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 3,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
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
        <div className="featured-main">
            <div className="featured-items-div">
                <div className="featured-items-slider">
                    <h2>Featured Items</h2>
                    <Slider {...settings}>
                        {products.map((product) => {
                            return (
                                <div key={product.id}>
                                    <Link
                                        to={`/product/${product.id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "#053F5F",
                                        }}
                                    >
                                        <img
                                            src={product.imageURL}
                                            alt="product"
                                            width="300px"
                                            height="300px"
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>

            <h1 id="motto">
                BEST PLACE TO LIVE, WORK, PLAY, AND RAISE A FAMILY
            </h1>
            <br></br>
            <div className="lower-featured" id="featured-content-wrapper">
                <ul
                    id="featured-content-image-links"
                    className="strip-ul flex-cont jc-c"
                >
                    <li data-hide="!true">
                        <a
                            href="https://parentportal.cajonvalley.net"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img
                                className="featured-item-pics"
                                src="https://www.cajonvalley.net/cms/lib/CA01902277/Centricity/Template/GlobalAssets/images/Images/parents_304x350.png"
                                alt="Parents"
                            />
                            <p>
                                <canvas
                                    className="double-right-angle-triangles"
                                    aria-hidden="true"
                                    width="28px"
                                    height="56px"
                                ></canvas>{" "}
                                <span>Parents</span>
                            </p>
                        </a>
                    </li>
                    <li data-hide="!true">
                        <a
                            href="https://studentportal.cajonvalley.net/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img
                                className="featured-item-pics"
                                src="https://www.cajonvalley.net/cms/lib/CA01902277/Centricity/Template/GlobalAssets/images/Images/students_304x350.png"
                                alt="Students"
                            />
                            <p>
                                <canvas
                                    className="double-right-angle-triangles"
                                    aria-hidden="true"
                                    width="28px"
                                    height="56px"
                                ></canvas>{" "}
                                <span>Students</span>
                            </p>
                        </a>
                    </li>
                    <li data-hide="!true">
                        <a
                            href="https://www.cajonvalley.net/staff"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img
                                className="featured-item-pics"
                                src="https://www.cajonvalley.net/cms/lib/CA01902277/Centricity/Template/GlobalAssets/images/Images/staff_304x350.png"
                                alt="Staff"
                            />
                            <p>
                                <canvas
                                    className="double-right-angle-triangles"
                                    aria-hidden="true"
                                    width="28px"
                                    height="56px"
                                ></canvas>{" "}
                                <span>Staff</span>
                            </p>
                        </a>
                    </li>
                    <li data-hide="true">
                        <a
                            href="https://www.cajonvalley.net/face"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img
                                className="featured-item-pics"
                                src="https://www.cajonvalley.net/cms/lib/CA01902277/Centricity/Template/GlobalAssets/images/Images/community_304x350.png"
                                alt="Community"
                            />
                            <p>
                                <canvas
                                    className="double-right-angle-triangles"
                                    aria-hidden="true"
                                    width="28px"
                                    height="56px"
                                ></canvas>{" "}
                                <span>Community</span>
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
