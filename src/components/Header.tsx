import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
    const location = useLocation();
    const isDemoRoute = location.pathname === '/demo';

    return (
        <header className="ihg-header">
            <div className="top-nav">
                <div className="container">
                    <div className="top-nav-left">
                        <a href="#" className="top-nav-link">
                            <i className="icon-phone"></i> 1-877-424-2449
                        </a>
                        <a href="#" className="top-nav-link">
                            <i className="icon-globe"></i> ENG
                        </a>
                        <a href="#" className="top-nav-link">
                            <i className="icon-currency"></i> USD
                        </a>
                    </div>
                    <div className="top-nav-right">
                        <a href="#" className="top-nav-link">
                            <i className="icon-user"></i> SIGN IN
                        </a>
                        <a href="#" className="top-nav-link">
                            <i className="icon-member"></i> JOIN
                        </a>
                        <a href="#" className="top-nav-link join-btn">
                            JOIN NOW
                        </a>
                    </div>
                </div>
            </div>
            <div className="main-nav">
                <div className="container">
                    <div className="logo">
                        <a href="/">
                            <div className="ihg-logo">
                                <span className="ihg-text">IHG</span>
                                <span className="hotels-text">Hotels & Resorts</span>
                            </div>
                        </a>
                    </div>
                    <nav className="nav-menu">
                        <ul>
                            <a href="#" className="nav-item">
                                <i className="icon-book"></i> Book
                            </a>
                            <a href="#" className="nav-item">
                                <i className="icon-manage"></i> Manage a Booking
                            </a>
                            <a href="#" className="nav-item">
                                <i className="icon-hotels"></i> Hotels & Resorts
                            </a>
                            <a href="#" className="nav-item">
                                <i className="icon-offers"></i> Special Offers
                            </a>
                            <a href="#" className="nav-item">
                                <i className="icon-about"></i> About Us
                            </a>
                            <a href="#" className="nav-item">
                                <i className="icon-rewards"></i> IHG One Rewards
                            </a>
                            <a href={isDemoRoute ? '/' : '/demo'} className={`nav-item security-demo`}>
                                <i className="icon-shield-alt"></i> {isDemoRoute ? 'Normal Mode' : 'Demo Mode'}
                            </a>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
