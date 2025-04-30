import React, { useState, useEffect } from 'react';

interface GoogleLoginCheckProps {
    onLoginStatusChange: (isLoggedIn: boolean) => void;
}

const GoogleLoginCheck: React.FC<GoogleLoginCheckProps> = ({ onLoginStatusChange }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [checkComplete, setCheckComplete] = useState(false);

    useEffect(() => {
        // Set a timeout to handle case where image loading takes too long
        const timeoutId = setTimeout(() => {
            if (isLoggedIn === null) {
                setIsLoggedIn(false);
                setCheckComplete(true);
                onLoginStatusChange(false);
            }
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [isLoggedIn, onLoginStatusChange]);

    const handleImageLoad = () => {
        setIsLoggedIn(true);
        setCheckComplete(true);
        onLoginStatusChange(true);
    };

    const handleImageError = () => {
        setIsLoggedIn(false);
        setCheckComplete(true);
        onLoginStatusChange(false);
    };

    return (
        <div style={{ display: 'none' }}>
            <img
                src="https://accounts.google.com/CheckCookie?continue=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&followup=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&chtml=LoginDoneHtml&checkedDomains=youtube&checkConnection=youtube%3A291%3A1"
                onLoad={handleImageLoad}
                onError={handleImageError}
                alt=""
            />
            {checkComplete && (
                <div>
                    {isLoggedIn ? (
                        <p>
                            <i className="icon-check"></i> Logged into Google
                        </p>
                    ) : (
                        <p>
                            <i className="icon-times"></i> Not logged into Google
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default GoogleLoginCheck;
