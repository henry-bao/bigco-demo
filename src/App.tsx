import { useState, useEffect } from 'react';
import './App.css';
import GoogleLoginCheck from './components/GoogleLoginCheck';
import Captcha from './components/Captcha';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Hero from './components/Hero';
import BrandsSection from './components/BrandsSection';
import Footer from './components/Footer';
import { isBotDetected, resetBotDetection, markHumanVerified } from './utils/botDetection';

function App() {
    const [isLoggedInToGoogle, setIsLoggedInToGoogle] = useState<boolean | null>(null);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showCaptcha, setShowCaptcha] = useState(false);

    // Check for bot detection
    useEffect(() => {
        const checkBotStatus = () => {
            // If bot is detected, reset captcha verification status
            if (isBotDetected()) {
                setIsCaptchaVerified(false);

                // Only show CAPTCHA if bot is detected and user isn't logged into Google
                if (!isLoggedInToGoogle) {
                    setShowCaptcha(true);
                }
            }
        };

        // Check every 2 seconds
        const intervalId = setInterval(checkBotStatus, 2000);

        return () => clearInterval(intervalId);
    }, [isLoggedInToGoogle]);

    const handleLoginStatusChange = (status: boolean) => {
        setIsLoggedInToGoogle(status);
        setIsLoading(false);

        // If logged in to Google, mark as human
        if (status) {
            markHumanVerified();
        }
    };

    const handleCaptchaVerified = () => {
        setIsCaptchaVerified(true);
        setShowCaptcha(false);

        // Reset bot detection after successful CAPTCHA
        resetBotDetection();

        // Mark as human after successful CAPTCHA
        markHumanVerified();
    };

    // Only show content if loading or authenticated (Google login or silent bot checks passed)
    const showContent = isLoading || isLoggedInToGoogle || isCaptchaVerified || !showCaptcha;

    return (
        <div className="App">
            {/* Hidden Google login check component */}
            <GoogleLoginCheck onLoginStatusChange={handleLoginStatusChange} />

            {/* Show captcha only if bot activity is detected or explicitly shown */}
            {showCaptcha && (
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

            {/* Loading state */}
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-container">
                        <div className="ihg-logo loading-logo">
                            <span className="ihg-text">IHG</span>
                            <span className="hotels-text">Hotels & Resorts</span>
                        </div>
                        <p>Checking your session...</p>
                        <div className="loading-spinner">
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                </div>
            )}

            {/* Main content - visible based on authentication status */}
            <div className={`main-content ${showContent ? '' : 'hidden'}`}>
                <Header />
                <SearchBar />
                <Hero />
                <BrandsSection />
                <Footer />
            </div>
        </div>
    );
}

export default App;
