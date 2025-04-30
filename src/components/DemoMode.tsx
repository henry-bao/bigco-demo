import { useState, useEffect } from 'react';
import '../App.css';
import GoogleLoginCheck from './GoogleLoginCheck';
import Captcha from './Captcha';
import Header from './Header';
import SearchBar from './SearchBar';
import Hero from './Hero';
import BrandsSection from './BrandsSection';
import Footer from './Footer';
import { markHumanVerified } from '../utils/botDetection';

function DemoMode() {
    const [isLoading, setIsLoading] = useState(true);
    const [checkProgress, setCheckProgress] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [captchaTriggeredBySearch, setCaptchaTriggeredBySearch] = useState(false);

    // Update check progress while loading
    useEffect(() => {
        if (!isLoading) return;

        const stages = [25, 50, 75, 100];
        let currentStage = 0;

        // Initial delay to show the first step clearly
        const initialDelay = setTimeout(() => {
            setCheckProgress(stages[0]);
            currentStage = 1;

            // Create main interval with longer delays between steps
            const progressInterval = setInterval(() => {
                if (currentStage < stages.length) {
                    setCheckProgress(stages[currentStage]);
                    currentStage++;

                    // Set animation complete when reaching last step
                    if (currentStage === stages.length) {
                        setTimeout(() => {
                            setAnimationComplete(true);
                        }, 600);
                    }
                } else {
                    clearInterval(progressInterval);
                }
            }, 600); // Delay between steps

            return () => clearInterval(progressInterval);
        }, 100); // Initial delay before starting

        return () => clearTimeout(initialDelay);
    }, [isLoading]);

    const handleLoginStatusChange = (status: boolean) => {
        // Allow time for animation to complete
        setTimeout(() => {
            setIsLoading(false);
        }, 3500);

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
        console.log('Captcha required by SearchBar in Demo Mode');
        setCaptchaTriggeredBySearch(true);
    };

    // Determine if CAPTCHA overlay should be shown - ONLY when triggered by search
    const shouldShowCaptchaOverlay = captchaTriggeredBySearch;

    // Helper to determine active animation step
    const isActiveStep = (step: number): boolean => {
        switch (step) {
            case 1:
                return checkProgress >= 25;
            case 2:
                return checkProgress >= 50;
            case 3:
                return checkProgress >= 75;
            case 4:
                return checkProgress >= 100;
            default:
                return false;
        }
    };

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

            {/* Loading state - only in demo mode */}
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-container">
                        <div className="ihg-logo loading-logo">
                            <span className="ihg-text">IHG</span>
                            <span className="hotels-text">Hotels & Resorts</span>
                        </div>
                        <p>Checking your session...</p>
                        <div className="session-check-animation">
                            <div className={`animation-step step1 ${isActiveStep(1) ? 'active' : ''}`}>
                                <i className="fas fa-search"></i>
                                <span>Looking for session data</span>
                            </div>
                            <div className={`animation-step step2 ${isActiveStep(2) ? 'active' : ''}`}>
                                <i className="fas fa-globe"></i>
                                <span>Verifying credentials</span>
                            </div>
                            <div className={`animation-step step3 ${isActiveStep(3) ? 'active' : ''}`}>
                                <i className="fas fa-shield-alt"></i>
                                <span>Checking security status</span>
                            </div>
                            <div className={`animation-step step4 ${isActiveStep(4) ? 'active' : ''}`}>
                                <i className="fas fa-check-circle"></i>
                                <span>Almost done</span>
                            </div>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${checkProgress}%` }}></div>
                        </div>
                        <div className={`loading-spinner ${animationComplete ? 'fade-out' : ''}`}>
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                        {animationComplete && (
                            <div className="completion-message">
                                <i className="fas fa-check-circle"></i>
                                <span>Session verified successfully!</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Main content - visible based on authentication status */}
            <div className={`main-content`}>
                <Header />
                <SearchBar isDemoModeEnabled={true} onRequireCaptcha={handleRequireCaptcha} />
                <Hero />
                <BrandsSection />
                <Footer />
            </div>
        </div>
    );
}

export default DemoMode;
