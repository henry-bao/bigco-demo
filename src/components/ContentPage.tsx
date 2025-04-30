import React from 'react';

const ContentPage: React.FC = () => {
    return (
        <div className="content-page">
            <h1>Welcome to Our Website</h1>
            <p>Thank you for verifying yourself. You now have access to all our content.</p>

            <div className="content-section">
                <h2>Featured Content</h2>
                <div className="content-grid">
                    <div className="content-card">
                        <h3>Article 1</h3>
                        <p>This is a sample article with some interesting content.</p>
                    </div>
                    <div className="content-card">
                        <h3>Article 2</h3>
                        <p>Another fascinating article that you can read now.</p>
                    </div>
                    <div className="content-card">
                        <h3>Article 3</h3>
                        <p>Yet another great piece of content for you to enjoy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
