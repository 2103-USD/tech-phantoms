import React from "react";
import "./style.css";

export const Footer = () => {
    return (
        <>
            <div className="footer">
            <div className="footer-item2">
                    <a href="https://www.cajonvalley.net" target="blank">
                    <img
                        src={require("../img/cajonvalleylogo.png")}
                        alt="Cajon Valley Logo"
                    />
                    </a>
                </div>
            <div className="footer-item1">
                    <h4>Cajon Valley Union School District</h4>
                    <h5>750 E. Main Street</h5>
                    <h5>El Cajon, CA 92020</h5>
                    <h5>Phone: 619.588.3000</h5>
                </div>
                
            
                <div className="footer-item3">
                    <h4>Connect with us online!</h4>
                    <div className="social-icons">
                        <a
                            className="social-link"
                            href="https://www.facebook.com/CajonValleyUSD" target="blank"
                        >
                            <img
                                className="social-icon"
                                src={require("../img/facebook.png")}
                                alt="Facebook Logo"
                            />
                        </a>
                        <a
                            className="social-link"
                            href="https://www.twitter.com/CajonValleyUSD" target="blank"
                        >
                            <img
                                className="social-icon"
                                src={require("../img/twitter.png")}
                                alt="Link to Cajon Valley's Twitter Feed"
                            />
                        </a>
                        <a
                            className="social-link"
                            href="https://www.youtube.com/channel/UCBYG3glJvLs6P3-OT7PH9OQ" target="blank"
                        >
                            <img
                                className="social-icon"
                                src={require("../img/youtube.png")}
                                alt="Link to Cajon Valley's Youtube Channel"
                            />
                        </a>
                        <a
                            className="social-link"
                            href="https://www.linkedin.com/company/cajonvalleyusd" target="blank"
                        >
                            <img
                                className="social-icon"
                                src={require("../img/linkedin.png")}
                                alt="Link to Cajon Valley's Linked In Feed"
                            />
                        </a>
                    </div>
                </div>
                <div className="copyright">
                <>
                    2021 &copy; Cajon Valley Union School District. All rights
                    reserved.
                </>

            </div>
            

            </div>
           
            
            
        </>
    );
};
