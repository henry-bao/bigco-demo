import React, { useState, useEffect } from 'react';
import '../styles/SearchBar.css';
import HoneytrapElements from './HoneytrapElements';
import TrustLevelIndicator from './TrustLevelIndicator';
import {
    initRecaptcha,
    processBookingWithBotDetection,
    isBotDetected as checkBotDetected,
    resetBotDetection,
    getUserTrustLevel,
    TrustLevel,
} from '../utils/botDetection';

// reCAPTCHA site key - in a real app, this would come from environment variables
const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Google's test key

interface FormData {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    rateCode: string;
}

const SearchBar: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        destination: '',
        checkIn: '',
        checkOut: '',
        guests: '1 Room, 1 Guest',
        rateCode: 'Standard Rate',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
    const [isDemoMode, setIsDemoMode] = useState(false);

    // Initialize reCAPTCHA on component mount
    useEffect(() => {
        initRecaptcha(RECAPTCHA_SITE_KEY).catch((err) => {
            console.error('Failed to initialize reCAPTCHA:', err);
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, name, value } = e.target;
        const fieldName = id || name;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            // Process booking with bot detection
            const result = await processBookingWithBotDetection(formData, RECAPTCHA_SITE_KEY);

            setIsLoading(false);
            setMessage({
                text: result.message,
                isError: !result.success,
            });

            if (result.success) {
                // Clear form or redirect as needed
                console.log('Booking successful!', formData);
            }
        } catch (error) {
            setIsLoading(false);
            setMessage({
                text: 'An unexpected error occurred. Please try again.',
                isError: true,
            });
            console.error('Booking error:', error);
        }
    };

    const toggleDemoMode = () => {
        // Always reset bot detection when toggling demo mode
        resetBotDetection(false);
        setIsDemoMode(!isDemoMode);
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                {/* Demo mode toggle */}
                {/* {getUserTrustLevel() !== TrustLevel.HUMAN && ( */}
                <div className="demo-mode-toggle">
                    <button
                        type="button"
                        className={`demo-toggle-btn ${isDemoMode ? 'active' : ''}`}
                        onClick={toggleDemoMode}
                    >
                        {isDemoMode ? 'Hide Security Demo' : 'Show Security Demo'}
                    </button>
                    {isDemoMode && getUserTrustLevel() !== TrustLevel.HUMAN && (
                        <div className="demo-explanation">
                            <p>
                                <strong>Bot Detection Demo Mode:</strong> Honeytraps are normally invisible elements
                                that only bots interact with. They're shown in red for demonstration purposes.
                                Interacting with them in normal mode would mark you as a bot.
                            </p>
                        </div>
                    )}
                </div>
                {/* )} */}

                {/* Trust level indicator (only shown in demo mode) */}
                <TrustLevelIndicator isDemoMode={isDemoMode} />

                {/* Include honeytrap elements */}
                {getUserTrustLevel() !== TrustLevel.HUMAN && (
                    <HoneytrapElements className="search-form-honeytrap" isDemoMode={isDemoMode} />
                )}

                <form className="search-form" onSubmit={handleSubmit}>
                    <div className="search-row">
                        <div className="search-input">
                            <label htmlFor="destination">
                                <i className="icon-search"></i> Destination / Hotel
                            </label>
                            <input
                                type="text"
                                id="destination"
                                placeholder="City, Airport, Attraction or Property"
                                value={formData.destination}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="search-dates">
                            <div className="date-input">
                                <label htmlFor="checkIn">
                                    <i className="icon-calendar"></i> Check-in
                                </label>
                                <input
                                    type="text"
                                    id="checkIn"
                                    placeholder="MM/DD/YYYY"
                                    value={formData.checkIn}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="date-input">
                                <label htmlFor="checkOut">
                                    <i className="icon-calendar"></i> Check-out
                                </label>
                                <input
                                    type="text"
                                    id="checkOut"
                                    placeholder="MM/DD/YYYY"
                                    value={formData.checkOut}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="search-guests">
                            <label htmlFor="guests">
                                <i className="icon-users"></i> Guests
                            </label>
                            <select id="guests" value={formData.guests} onChange={handleInputChange}>
                                <option>1 Room, 1 Guest</option>
                                <option>1 Room, 2 Guests</option>
                                <option>2 Rooms, 3 Guests</option>
                                <option>2 Rooms, 4 Guests</option>
                            </select>
                        </div>
                        <div className="rate-code">
                            <label htmlFor="rateCode">
                                <i className="icon-tag"></i> Rate & Codes
                            </label>
                            <select id="rateCode" value={formData.rateCode} onChange={handleInputChange}>
                                <option>Standard Rate</option>
                                <option>Member Rate</option>
                                <option>Corporate Rate</option>
                            </select>
                        </div>
                    </div>

                    {/* Message display for success/error */}
                    {message && (
                        <div className={`search-message ${message.isError ? 'error' : 'success'}`}>{message.text}</div>
                    )}

                    <div className="search-action">
                        <button
                            type="submit"
                            className="search-btn"
                            disabled={isLoading || (checkBotDetected() && !isDemoMode)}
                        >
                            {isLoading ? (
                                <span className="loading-spinner">
                                    <i className="icon-spinner"></i>
                                </span>
                            ) : (
                                <>
                                    <i className="icon-search-btn"></i> SEARCH
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SearchBar;
