import React, { useEffect } from 'react';

const SocialLoginDemo: React.FC = () => {
    useEffect(() => {
        const statusDiv = document.createElement('div');
        statusDiv.className = 'status';
        document.body.appendChild(statusDiv);

        const img = document.createElement('img');
        img.onload = () => show_login_status('Google', true);
        img.onerror = () => show_login_status('Google', false);
        img.src =
            'https://accounts.google.com/CheckCookie?continue=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&followup=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&chtml=LoginDoneHtml&checkedDomains=youtube&checkConnection=youtube%3A291%3A1';
        document.body.appendChild(img);

        function show_login_status(network: string, status: boolean) {
            const statusText = document.createElement('p');
            if (status) {
                statusText.innerText = `You are logged in to ${network}.\n`;
                statusText.style.color = 'green';
            } else {
                statusText.innerText = `You are not logged in to ${network}.\n`;
                statusText.style.color = 'red';
            }
            statusDiv.appendChild(statusText);
        }

        return () => {
            // Cleanup
            document.body.removeChild(statusDiv);
            if (img.parentNode) {
                document.body.removeChild(img);
            }
        };
    }, []);

    return <div className="social-login-demo"></div>;
};

export default SocialLoginDemo;
