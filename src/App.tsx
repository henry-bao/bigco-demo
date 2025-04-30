import { useState } from 'react';
import './App.css';
import GoogleLoginCheck from './components/GoogleLoginCheck';
import Captcha from './components/Captcha';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Hero from './components/Hero';
import BrandsSection from './components/BrandsSection';
import Footer from './components/Footer';
import { markHumanVerified } from './utils/botDetection';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [captchaTriggeredBySearch, setCaptchaTriggeredBySearch] = useState(false);

    const handleLoginStatusChange = (status: boolean) => {
        setIsLoading(false);

        // If logged in to Google, mark as human
        if (status) {
            markHumanVerified();
        }
    };

    const handleCaptchaVerified = () => {
        setCaptchaTriggeredBySearch(false); // Reset search trigger

        // Mark as human after successful CAPTCHA
        // We should mark as human here, assuming CAPTCHA pass means human
        markHumanVerified();

        // Optionally: Reset bot detection state if desired after CAPTCHA pass
        // resetBotDetection();
    };

    const handleRequireCaptcha = () => {
        console.log('Captcha required by SearchBar');
        setCaptchaTriggeredBySearch(true);
    };

    // Determine if CAPTCHA overlay should be shown - ONLY when triggered by search
    const shouldShowCaptchaOverlay = captchaTriggeredBySearch;

    return (
        <div className="App">
            {/* Hidden Google login check component */}
            <GoogleLoginCheck onLoginStatusChange={handleLoginStatusChange} />

            {/* Show captcha only if bot activity is detected or explicitly shown */}
            {shouldShowCaptchaOverlay && (
                <div className="captcha-overlay">
                    <div className="captcha-container">
                        <div className="ihg-captcha-header">
                            <div className="ihg-logo">
                                <span className="ihg-text">IHG</span>
                                <span className="hotels-text">Hotels & Resorts</span>
                            </div>
                        </div>
                        <Captcha onCaptchaVerified={handleCaptchaVerified} />
                    </div>
                </div>
            )}

            {/* Simple loading state for regular version */}
            {isLoading && (
                <div className="loading-overlay">
                    <div className="simple-loading-container">
                        <div className="ihg-logo loading-logo">
                            <span className="ihg-text">IHG</span>
                            <span className="hotels-text">Hotels & Resorts</span>
                        </div>
                        <p>Loading...</p>
                        <div className="loading-spinner">
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                </div>
            )}

            {/* Main content - visible based on authentication status */}
            <div className={`main-content ${!isLoading ? '' : 'hidden'}`}>
                <Header />
                <SearchBar onRequireCaptcha={handleRequireCaptcha} />
                <Hero />
                <BrandsSection />
                <Footer />
            </div>
        </div>
    );
}

export default App;
