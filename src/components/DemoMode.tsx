import { useState, useEffect } from 'react';
import '../App.css';
import GoogleLoginCheck from './GoogleLoginCheck';
import MainLayout from './MainLayout';
import { useAppLogic } from '../hooks/useAppLogic';

function DemoMode() {
    const {
        isLoading,
        shouldShowCaptchaOverlay,
        handleLoginStatusChange: originalHandleLoginStatusChange,
        handleCaptchaVerified,
        handleRequireCaptcha: originalHandleRequireCaptcha,
    } = useAppLogic({ loadingDelay: 2500 });

    const [checkProgress, setCheckProgress] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);

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
                        }, 300);
                    }
                } else {
                    clearInterval(progressInterval);
                }
            }, 400); // Delay between steps

            return () => clearInterval(progressInterval);
        }, 100); // Initial delay before starting

        return () => clearTimeout(initialDelay);
    }, [isLoading]);

    // Wrapper for login status change to potentially include demo-specific logic if needed
    const handleLoginStatusChange = (status: boolean) => {
        // Call the original handler from the hook (which includes the delay)
        originalHandleLoginStatusChange(status);
        // Add any DemoMode specific logic here if required in the future
    };

    // Wrapper for require captcha to add demo-specific logging
    const handleRequireCaptcha = () => {
        console.log('Captcha required by SearchBar in Demo Mode');
        originalHandleRequireCaptcha(); // Call the original handler from the hook
    };

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
        <MainLayout
            isLoading={isLoading}
            shouldShowCaptchaOverlay={shouldShowCaptchaOverlay}
            isDemoModeEnabled={true}
            onRequireCaptcha={handleRequireCaptcha}
            onCaptchaVerified={handleCaptchaVerified}
        >
            {/* Hidden Google login check component */}
            <GoogleLoginCheck onLoginStatusChange={handleLoginStatusChange} />

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
        </MainLayout>
    );
}

export default DemoMode;
