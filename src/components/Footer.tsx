import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-app-section">
                <div className="container footer-app-container">
                    <div className="app-info">
                        <h2>Download easier travel</h2>
                        <p>
                            Get our mobile booking app fast. Access 6,000+ global destinations and top quality
                            amenities.
                        </p>
                        <button className="learn-more-btn">
                            <i className="icon-mobile-app"></i> LEARN MORE
                        </button>
                    </div>
                    <div className="app-qr">
                        <div className="qr-code-placeholder">
                            <i className="icon-qrcode"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-membership-section">
                <div className="container membership-container">
                    <div className="membership-image">
                        <div className="membership-image-placeholder">
                            <i className="icon-swimming-pool"></i>
                            <span>Member Benefits</span>
                        </div>
                    </div>
                    <div className="membership-info">
                        <div className="membership-logo">
                            <div className="ihg-rewards-logo">
                                <span className="ihg-text">IHG</span>
                                <span className="one-rewards-text">ONE REWARDS</span>
                            </div>
                        </div>
                        <h2>It's better to be a member</h2>
                        <ul className="membership-benefits">
                            <li>Earn points to use for free nights</li>
                            <li>No blackout dates</li>
                            <li>Access to member rates & offers</li>
                            <li>Free WiFi</li>
                            <li>Flexible booking policy when you need it</li>
                        </ul>
                        <button className="join-free-btn">
                            <i className="icon-user-plus"></i> JOIN FOR FREE
                        </button>
                        <a href="#" className="already-member">
                            Already a member? Sign in.
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-main">
                <div className="container">
                    <div className="footer-message">
                        <h2>Wherever you go, we're here for you</h2>
                        <p>
                            Whatever your travel preferences might be, from a business trip to a vacation around the
                            world, there's an IHG hotel with 6000+ hotels in over 100 countries around the globe.
                        </p>
                    </div>

                    <div className="footer-links-section">
                        <div className="footer-links-column">
                            <h3>
                                <i className="icon-usa"></i> Top Destinations in the US
                            </h3>
                            <ul>
                                <li>
                                    <a href="#">New York</a>
                                </li>
                                <li>
                                    <a href="#">Chicago</a>
                                </li>
                                <li>
                                    <a href="#">Las Vegas</a>
                                </li>
                                <li>
                                    <a href="#">San Francisco</a>
                                </li>
                                <li>
                                    <a href="#">Miami</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-links-column">
                            <h3>
                                <i className="icon-world-map"></i> Top Destinations by Country/Region
                            </h3>
                            <ul>
                                <li>
                                    <a href="#">Canada</a>
                                </li>
                                <li>
                                    <a href="#">United Kingdom</a>
                                </li>
                                <li>
                                    <a href="#">Mexico</a>
                                </li>
                                <li>
                                    <a href="#">France</a>
                                </li>
                                <li>
                                    <a href="#">Spain</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-links-column">
                            <h3>
                                <i className="icon-plane"></i> Top International Destinations
                            </h3>
                            <ul>
                                <li>
                                    <a href="#">London</a>
                                </li>
                                <li>
                                    <a href="#">Paris</a>
                                </li>
                                <li>
                                    <a href="#">Dubai</a>
                                </li>
                                <li>
                                    <a href="#">Tokyo</a>
                                </li>
                                <li>
                                    <a href="#">Sydney</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-brands">
                        <div className="brand-logos">
                            {/* Brand icons instead of placeholders */}
                            <div className="brand-logo">
                                <i className="icon-hotel-brand"></i>
                            </div>
                            <div className="brand-logo">
                                <i className="icon-hotel-brand"></i>
                            </div>
                            <div className="brand-logo">
                                <i className="icon-hotel-brand"></i>
                            </div>
                            <div className="brand-logo">
                                <i className="icon-hotel-brand"></i>
                            </div>
                            <div className="brand-logo">
                                <i className="icon-hotel-brand"></i>
                            </div>
                            <div className="brand-logo">
                                <i className="icon-hotel-brand"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-legal">
                        <div className="footer-logo">
                            <div className="ihg-footer-logo">
                                <span className="ihg-text">IHG</span>
                                <span className="hotels-text">Hotels & Resorts</span>
                            </div>
                        </div>
                        <div className="footer-social">
                            <a href="#" className="social-icon">
                                <i className="icon-facebook"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="icon-twitter"></i>
                            </a>
                            <a href="#" className="social-icon">
                                <i className="icon-instagram"></i>
                            </a>
                        </div>
                    </div>
                    <div className="footer-legal-links">
                        <a href="#">Privacy & Cookies</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Site Map</a>
                        <a href="#">Accessibility</a>
                        <p className="copyright">© 2023 IHG. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
 