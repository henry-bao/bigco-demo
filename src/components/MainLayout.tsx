import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Hero from './Hero';
import BrandsSection from './BrandsSection';
import Footer from './Footer';
import Captcha from './Captcha';

interface MainLayoutProps {
    isLoading: boolean;
    shouldShowCaptchaOverlay: boolean;
    isDemoModeEnabled?: boolean; // Optional prop for demo mode specifics
    onRequireCaptcha: () => void;
    onCaptchaVerified: () => void;
    children?: React.ReactNode; // To allow passing custom loading indicators etc.
}

const MainLayout: React.FC<MainLayoutProps> = ({
    isLoading,
    shouldShowCaptchaOverlay,
    isDemoModeEnabled = false, // Default to false
    onRequireCaptcha,
    onCaptchaVerified,
    children,
}) => {
    return (
        <div className="App">
            {/* Show captcha overlay */}
            {shouldShowCaptchaOverlay && (
                <div className="captcha-overlay">
                    <div className="captcha-container">
                        <div className="ihg-captcha-header">
                            <div className="ihg-logo">
                                <span className="ihg-text">IHG</span>
                                <span className="hotels-text">Hotels & Resorts</span>
                            </div>
                        </div>
                        <Captcha onCaptchaVerified={onCaptchaVerified} />
                    </div>
                </div>
            )}

            {/* Render custom children first (e.g., loading overlays) */}
            {children}

            {/* Main content - visibility handled by parent or children */}
            {/* We might want to refine visibility logic depending on how loading overlays are handled */}
            <div className={`main-content ${isLoading ? 'hidden' : ''}`}>
                <Header />
                <SearchBar isDemoModeEnabled={isDemoModeEnabled} onRequireCaptcha={onRequireCaptcha} />
                <Hero />
                <BrandsSection />
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
