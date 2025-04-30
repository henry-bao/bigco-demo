/**
 * Bot detection utility module that manages honeytrap elements and detection logic
 */

// Types of honeytraps we can use
export enum HoneytrapType {
    BUTTON = 'button',
    INPUT = 'input',
    DATE = 'date',
}

// Visitor trust levels
export enum TrustLevel {
    UNKNOWN = 'unknown',
    HUMAN = 'human',
    BOT = 'bot',
}

// Store state of bot detection
let botDetected = false;
let selectedTrap: HoneytrapType | null = null;
let userTrustLevel: TrustLevel = TrustLevel.UNKNOWN;

/**
 * Randomly selects a honeytrap type for this session
 * @returns The selected honeytrap type
 */
export const selectRandomHoneytrap = (): HoneytrapType => {
    const traps = Object.values(HoneytrapType);
    const randomIndex = Math.floor(Math.random() * traps.length);
    selectedTrap = traps[randomIndex];
    return selectedTrap;
};

/**
 * Get the currently selected honeytrap type
 * @returns The current honeytrap type or null if none selected
 */
export const getSelectedHoneytrap = (): HoneytrapType | null => {
    return selectedTrap;
};

/**
 * Mark interaction with a honeytrap element, indicating bot behavior
 */
export const markBotInteraction = (): void => {
    botDetected = true;
    userTrustLevel = TrustLevel.BOT;
    console.log('Bot interaction detected and logged');

    // In a real implementation, you might want to also log this server-side
    // or take other actions like redirecting
};

/**
 * Mark user as human (verified through login or CAPTCHA)
 */
export const markHumanVerified = (): void => {
    botDetected = false;
    userTrustLevel = TrustLevel.HUMAN;
    console.log('User verified as human');
};

/**
 * Get the current user's trust level
 * @returns The trust level of the current user
 */
export const getUserTrustLevel = (): TrustLevel => {
    return userTrustLevel;
};

/**
 * Check if a bot has been detected
 * @returns True if bot interaction has been detected
 */
export const isBotDetected = (): boolean => {
    return botDetected;
};

/**
 * Reset the bot detection state (useful for testing)
 */
export const resetBotDetection = (resetTrustLevel: boolean = true): void => {
    if (resetTrustLevel) {
        userTrustLevel = TrustLevel.UNKNOWN;
    }
    botDetected = false;
    selectedTrap = null;
};

/**
 * Initialize Google reCAPTCHA v3
 * @param siteKey Your reCAPTCHA site key
 * @returns Promise that resolves when reCAPTCHA is loaded
 */
export const initRecaptcha = (siteKey: string): Promise<void> => {
    return new Promise((resolve) => {
        // Add reCAPTCHA script to page
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        document.head.appendChild(script);

        script.onload = () => {
            // @ts-ignore - grecaptcha is injected by the script
            window.grecaptcha.ready(() => {
                resolve();
            });
        };
    });
};

/**
 * Execute reCAPTCHA verification
 * @param siteKey Your reCAPTCHA site key
 * @param action The action name to verify
 * @returns Promise with the reCAPTCHA token
 */
export const executeRecaptcha = async (siteKey: string, action: string): Promise<string> => {
    // @ts-ignore - grecaptcha is injected by the script
    return await window.grecaptcha.execute(siteKey, { action });
};

/**
 * Process booking after bot detection checks
 * @param formData The booking form data
 * @param recaptchaSiteKey Your reCAPTCHA site key
 * @returns Promise resolving to booking result
 */
export const processBookingWithBotDetection = async (
    _: any,
    recaptchaSiteKey: string
): Promise<{ success: boolean; message: string }> => {
    // First check if a bot was detected via honeytraps
    if (botDetected) {
        return {
            success: false,
            message: 'We were unable to process your request due to security concerns.',
        };
    }

    try {
        // Execute reCAPTCHA v3 verification
        await executeRecaptcha(recaptchaSiteKey, 'booking');

        // In a real application, you would send this token to your backend
        // for verification, along with the form data

        // If we get here successfully, mark the user as human
        markHumanVerified();

        // For demo purposes, we'll simulate a successful booking
        return {
            success: true,
            message: 'Booking successful! Thank you for choosing IHG.',
        };
    } catch (error) {
        console.error('reCAPTCHA verification failed:', error);
        return {
            success: false,
            message: 'We were unable to verify your request. Please try again later.',
        };
    }
};

export default {
    selectRandomHoneytrap,
    getSelectedHoneytrap,
    markBotInteraction,
    markHumanVerified,
    getUserTrustLevel,
    isBotDetected,
    resetBotDetection,
    initRecaptcha,
    executeRecaptcha,
    processBookingWithBotDetection,
    TrustLevel,
};
