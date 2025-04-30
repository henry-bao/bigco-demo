import React from 'react';
import '../styles/Hero.css';

const Hero: React.FC = () => {
    return (
        <div className="hero-section">
            <div className="hero-background">
                <div className="hero-image-replacement">
                    <div className="hero-overlay">
                        <i className="icon-hotel"></i>
                        <span>IHG Luxury Resort</span>
                    </div>
                </div>
            </div>
            <div className="hero-content">
                <div className="card-promo">
                    <div className="card-image">
                        <div className="credit-card-mockup">
                            <div className="credit-card-content">
                                <div className="card-top">
                                    <div className="card-chip"></div>
                                    <div className="card-brand">
                                        <i className="icon-credit-card"></i>
                                        <span>IHG ONE REWARDS</span>
                                    </div>
                                </div>
                                <div className="card-middle">
                                    <div className="card-number">
                                        <span>5678</span>
                                        <span>9012</span>
                                        <span>3456</span>
                                        <span>7890</span>
                                    </div>
                                </div>
                                <div className="card-bottom">
                                    <div>
                                        <div className="card-holder">Card Holder</div>
                                        <div className="card-name">VALUED MEMBER</div>
                                    </div>
                                    <div>
                                        <div className="expiry-label">Valid Thru</div>
                                        <div className="expiry-date">12/28</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-info">
                        <h2 className="card-headline">
                            <span className="small-text">With the IHG One Rewards Premier</span>
                            <span className="large-text">Credit Card, you can earn</span>
                        </h2>
                        <div className="bonus-points">
                            <span className="points-number">140,000</span>
                            <span className="points-text">BONUS POINTS</span>
                        </div>
                        <p className="bonus-details">That's up to 4 nights at most of our hotels & resorts globally</p>
                        <button className="learn-more-btn">
                            <i className="icon-arrow-right"></i> LEARN MORE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
