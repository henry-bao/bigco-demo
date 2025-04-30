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
    const [captchaTriggeredBySearch, setCaptchaTriggeredBySearch] = useState(false);

    // Check for bot detection - Remove automatic captcha display logic
    useEffect(() => {
        // This effect can potentially be removed or simplified if its only purpose
        // was to automatically show CAPTCHA on bot detection.
        // For now, let's keep it but comment out the CAPTCHA logic.
        /*
        const checkBotStatus = () => {
            // If bot is detected, reset captcha verification status
            if (isBotDetected()) {
                setIsCaptchaVerified(false);

                // Only show CAPTCHA if bot is detected and user isn't logged into Google
                // And captcha wasn't explicitly triggered by search
                // --- THIS LOGIC IS REMOVED --- 
                // if (!isLoggedInToGoogle && !captchaTriggeredBySearch) {
                //     setShowCaptcha(true);
                // }
            } else {
                 // If bot not detected anymore, hide captcha unless triggered by search
                 // --- THIS LOGIC IS REMOVED --- 
                 // if (!captchaTriggeredBySearch) {
                 //    setShowCaptcha(false);
                 // }
            }
        };

        // Check every 2 seconds
        const intervalId = setInterval(checkBotStatus, 2000);

        return () => clearInterval(intervalId);
        */
    }, [isLoggedInToGoogle]); // Remove captchaTriggeredBySearch dependency

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
        // setShowCaptcha(false); // No longer needed as shouldShowCaptchaOverlay controls it
        setCaptchaTriggeredBySearch(false); // Reset search trigger

        // Mark as human after successful CAPTCHA
        // We should mark as human here, assuming CAPTCHA pass means human
        markHumanVerified();

        // Optionally: Reset bot detection state if desired after CAPTCHA pass
        // resetBotDetection();
    };

    const handleRequireCaptcha = () => {
        console.log('Captcha required by SearchBar');
        setIsCaptchaVerified(false); // Ensure captcha state is false before showing
        setCaptchaTriggeredBySearch(true);
        // setShowCaptcha(true); // No longer needed directly
    };

    // Determine if CAPTCHA overlay should be shown - ONLY when triggered by search
    const shouldShowCaptchaOverlay = captchaTriggeredBySearch;

    // Only show content if loading or authenticated (Google login or CAPTCHA verified)
    const showContent = !isLoading && (isLoggedInToGoogle || isCaptchaVerified);

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
