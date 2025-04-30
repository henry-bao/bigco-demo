import { useState } from 'react';
import { markHumanVerified } from '../utils/botDetection';

interface UseAppLogicProps {
    initialLoadingState?: boolean;
    loadingDelay?: number; // Allow overriding delay for demo mode
}

export function useAppLogic({ initialLoadingState = true, loadingDelay = 0 }: UseAppLogicProps = {}) {
    const [isLoading, setIsLoading] = useState(initialLoadingState);
    const [captchaTriggeredBySearch, setCaptchaTriggeredBySearch] = useState(false);

    const handleLoginStatusChange = (status: boolean) => {
        // Use timeout only if a delay is specified (for demo mode)
        if (loadingDelay > 0) {
            setTimeout(() => {
                setIsLoading(false);
            }, loadingDelay);
        } else {
            setIsLoading(false);
        }

        if (status) {
            markHumanVerified();
        }
    };

    const handleCaptchaVerified = () => {
        setCaptchaTriggeredBySearch(false);
        markHumanVerified();
    };

    const handleRequireCaptcha = () => {
        console.log('Captcha required'); // Keep logging general
        setCaptchaTriggeredBySearch(true);
    };

    const shouldShowCaptchaOverlay = captchaTriggeredBySearch;

    return {
        isLoading,
        setIsLoading, // Expose setter if needed by specific components (like DemoMode)
        shouldShowCaptchaOverlay,
        handleLoginStatusChange,
        handleCaptchaVerified,
        handleRequireCaptcha,
    };
}
