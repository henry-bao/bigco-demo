import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface CaptchaProps {
    onCaptchaVerified: () => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onCaptchaVerified }) => {
    const [verified, setVerified] = useState(false);

    // You should replace this with your actual site key from Google reCAPTCHA
    const siteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // This is a test key

    const handleCaptchaChange = (value: string | null) => {
        if (value) {
            setVerified(true);
            onCaptchaVerified();
        }
    };

    return (
        <div className="captcha-container">
            <div className="captcha-message">
                <h2>
                    <i className="icon-shield-alt"></i> Please verify you're human
                </h2>
                <p>
                    For security purposes, we need to verify you're not a bot. This helps protect our users and maintain
                    the quality of our service.
                </p>
            </div>
            <div className="recaptcha-wrapper">
                <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} />
            </div>
            {verified && (
                <div className="success-message">
                    <p>
                        <i className="icon-check-circle"></i> Verification successful! You'll be redirected to the IHG
                        website shortly.
                    </p>
                </div>
            )}
            <div className="captcha-footer">
                <p>
                    <i className="icon-lock"></i> This site is protected by reCAPTCHA and the{' '}
                    <a href="https://policies.google.com/privacy">Google Privacy Policy</a> and{' '}
                    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                </p>
            </div>
        </div>
    );
};

export default Captcha;
