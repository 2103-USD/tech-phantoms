import React from "react";
import "./style.css";

export const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="footer-item">
                    <img
                        src={require("../img/cajonvalleylogo.png")}
                        alt="Cajon Valley Logo"
                        width="300px"
                        height="300px"
                    />
                </div>
                <div className="footer-item">
                    <h4>Cajon Valley Union School District</h4>
                    <h5>750 E. Main Street</h5>
                    <h5>El Cajon, CA 92020</h5>
                    <h5>Phone: 619.588.3000</h5>
                </div>
                <div className="footer-item">
                    <h4>Connect with us online!</h4>
                    <div className="social-icons">
                        <a
                            className="social-link"
                            href="https://www.facebook.com/CajonValleyUSD"
                        >
                            <img
                                className="social-icon"
                                src={require("../img/facebook.png")}
                                alt="Facebook Logo"
                                width="128px"
                                height="128px"
                            />
                        </a>
                        <a
                            className="social-link"
                            href="https://www.twitter.com/CajonValleyUSD"
                        >
                            <img
                                className="social-icon"
                                src={require("../img/twitter.png")}
                                alt="Link to Cajon Valley's Twitter Feed"
                                width="128px"
                                height="128px"
                            />
                        </a>
                        <a
                            className="social-link"
                            href="https://www.youtube.com/channel/UCBYG3glJvLs6P3-OT7PH9OQ"
                        >
                            <img
                                className="social-icon"
                                src={require("../img/youtube.png")}
                                alt="Link to Cajon Valley's Youtube Channel"
                                width="128px"
                                height="128px"
                            />
                        </a>
                        <a
                            className="social-link"
                            href="https://www.linkedin.com/company/cajonvalleyusd"
                        >
                            <img
                                className="social-icon"
                                src={require("../img/linkedin.png")}
                                alt="Link to Cajon Valley's Linked In Feed"
                                width="128px"
                                height="128px"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <h7>
                    2021 &copy; Cajon Valley Union School District. All rights
                    reserved.
                </h7>
            </div>
        </>
    );
};
