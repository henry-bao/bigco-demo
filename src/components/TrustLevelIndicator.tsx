import React, { useState, useEffect } from 'react';
import { getUserTrustLevel, TrustLevel } from '../utils/botDetection';
import '../styles/TrustLevelIndicator.css';

interface TrustLevelIndicatorProps {
    className?: string;
    isDemoMode?: boolean;
}

const TrustLevelIndicator: React.FC<TrustLevelIndicatorProps> = ({ className, isDemoMode = false }) => {
    const [trustLevel, setTrustLevel] = useState<TrustLevel>(getUserTrustLevel());

    // Update the trust level status periodically
    useEffect(() => {
        const updateTrustLevel = () => {
            const currentTrustLevel = getUserTrustLevel();
            setTrustLevel(currentTrustLevel);
        };

        // Check trust level every second
        const intervalId = setInterval(updateTrustLevel, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // Only show if in demo mode
    if (!isDemoMode) return null;

    // Get appropriate icon and class based on trust level
    const getTrustLevelIcon = (level: TrustLevel): string => {
        switch (level) {
            case TrustLevel.HUMAN:
                return 'user-check';
            case TrustLevel.BOT:
                return 'robot';
            case TrustLevel.UNKNOWN:
            default:
                return 'question-circle';
        }
    };

    const getTrustLevelClass = (level: TrustLevel): string => {
        switch (level) {
            case TrustLevel.HUMAN:
                return 'human';
            case TrustLevel.BOT:
                return 'bot';
            case TrustLevel.UNKNOWN:
            default:
                return 'unknown';
        }
    };

    const getTrustLevelLabel = (level: TrustLevel): string => {
        switch (level) {
            case TrustLevel.HUMAN:
                return 'Verified Human';
            case TrustLevel.BOT:
                return 'Suspected Bot';
            case TrustLevel.UNKNOWN:
            default:
                return 'Unknown Visitor';
        }
    };

    const icon = getTrustLevelIcon(trustLevel);
    const statusClass = getTrustLevelClass(trustLevel);
    const label = getTrustLevelLabel(trustLevel);

    return (
        <div className={`trust-level-indicator ${statusClass} ${className || ''}`}>
            <div className="trust-level-icon">
                <i className={`fas fa-${icon}`}></i>
            </div>
            <div className="trust-level-info">
                <div className="trust-level-label">
                    <span>Trust Level:</span>
                </div>
                <div className="trust-level-status">{label}</div>
            </div>
        </div>
    );
};

export default TrustLevelIndicator;
