import './App.css';
import GoogleLoginCheck from './components/GoogleLoginCheck';
import MainLayout from './components/MainLayout';
import { useAppLogic } from './hooks/useAppLogic';

function App() {
    const {
        isLoading,
        shouldShowCaptchaOverlay,
        handleLoginStatusChange,
        handleCaptchaVerified,
        handleRequireCaptcha,
    } = useAppLogic();

    return (
        <MainLayout
            isLoading={isLoading}
            shouldShowCaptchaOverlay={shouldShowCaptchaOverlay}
            onRequireCaptcha={handleRequireCaptcha}
            onCaptchaVerified={handleCaptchaVerified}
        >
            {/* Hidden Google login check component */}
            <GoogleLoginCheck onLoginStatusChange={handleLoginStatusChange} />

            {/* Simple loading state for regular version - passed as children */}
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
            {/* Main content is now rendered inside MainLayout */}
        </MainLayout>
    );
}

export default App;
