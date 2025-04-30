import React from 'react';
import '../styles/BrandsSection.css';

const BrandsSection: React.FC = () => {
    return (
        <div className="brands-section">
            <div className="welcome-message">
                <h2>WELCOME TO IHG HOTELS & RESORTS</h2>
            </div>

            <div className="brands-overview container">
                <h1 className="brands-title">
                    19 hotel brands.
                    <br />
                    6,000+ global destinations.
                </h1>
                <p className="brands-subtitle">
                    Travel the way you want with IHG One Rewards, our loyalty program where it pays to be yourself, and
                    find a world of experiences around the globe.
                </p>
                <button className="explore-btn">
                    <i className="icon-explore"></i> EXPLORE MORE
                </button>
            </div>

            <div className="offers-section container">
                <h2 className="offers-title">Offers for every way you travel</h2>

                <div className="offers-grid">
                    <div className="offer-card">
                        <div className="offer-image-container">
                            <i className="icon-discount"></i>
                            <div className="offer-image-overlay">Member Exclusives</div>
                        </div>
                        <div className="offer-content">
                            <h3>Member Exclusives: Save up to 20%</h3>
                            <p>
                                For our most rewarding rates every day of the week, enjoy our Member Exclusive rates at
                                participating IHG® Hotels & Resorts worldwide.
                            </p>
                            <a href="#" className="offer-link">
                                LEARN MORE <i className="icon-chevron-right"></i>
                            </a>
                        </div>
                    </div>

                    <div className="offer-card">
                        <div className="offer-image-container">
                            <i className="icon-globe-travel"></i>
                            <div className="offer-image-overlay">World Travel</div>
                        </div>
                        <div className="offer-content">
                            <h3>See the world in bloom</h3>
                            <p>
                                Whether traveling to big partners or hidden gems, enjoy added perks when you book
                                directly with IHG Hotels & Resorts.
                            </p>
                            <a href="#" className="offer-link">
                                LEARN MORE <i className="icon-chevron-right"></i>
                            </a>
                        </div>
                    </div>

                    <div className="offer-card">
                        <div className="offer-image-container">
                            <i className="icon-breakfast"></i>
                            <div className="offer-image-overlay">Free Breakfast</div>
                        </div>
                        <div className="offer-content">
                            <h3>The best things in life are free</h3>
                            <p>
                                Start your day with free breakfast points for IHG One Rewards or with a package that
                                includes breakfast for all at participating IHG Hotels & Resorts.
                            </p>
                            <a href="#" className="offer-link">
                                LEARN MORE <i className="icon-chevron-right"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="view-all-container">
                    <button className="view-all-btn">
                        <i className="icon-grid"></i> VIEW ALL OFFERS
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BrandsSection;
 