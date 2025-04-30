import React, { useEffect, useState } from 'react';
import { HoneytrapType, markBotInteraction, selectRandomHoneytrap } from '../utils/botDetection';

// Styles for making honeytraps invisible to humans
const honeytrapStyles = (isDemoMode: boolean): React.CSSProperties => ({
    position: isDemoMode ? 'relative' : 'absolute',
    opacity: isDemoMode ? 1 : 0,
    pointerEvents: 'auto', // We want clicks/interactions to be caught
    height: isDemoMode ? 'auto' : 0,
    width: isDemoMode ? '100%' : 0,
    overflow: isDemoMode ? 'visible' : 'hidden',
    zIndex: isDemoMode ? 10 : -1,
    left: isDemoMode ? 'auto' : '-9999px',
    top: isDemoMode ? 'auto' : 0,
    padding: isDemoMode ? '10px' : 0,
    margin: isDemoMode ? '0 0 15px 0' : 0,
    background: isDemoMode ? 'rgba(255, 0, 0, 0.08)' : 'transparent',
    border: isDemoMode ? '2px dashed #cc0000' : 'none',
    borderRadius: isDemoMode ? '8px' : '0',
    color: isDemoMode ? '#cc0000' : 'transparent',
    fontWeight: isDemoMode ? 'bold' : 'normal',
    fontSize: isDemoMode ? '12px' : '0',
    boxShadow: isDemoMode ? '0 2px 8px rgba(255, 0, 0, 0.2)' : 'none',
    transition: 'all 0.3s ease-in-out',
    display: 'block',
});

const honeytrapContentStyles = (isDemoMode: boolean): React.CSSProperties => ({
    display: isDemoMode ? 'block' : 'none',
    margin: isDemoMode ? '10px 0' : 0,
});

const honeytrapButtonStyles = (isDemoMode: boolean): React.CSSProperties => ({
    backgroundColor: isDemoMode ? '#fff' : 'transparent',
    color: isDemoMode ? '#cc0000' : 'transparent',
    border: isDemoMode ? '1px solid #cc0000' : 'none',
    padding: isDemoMode ? '8px 16px' : 0,
    borderRadius: isDemoMode ? '4px' : 0,
    cursor: 'pointer',
    fontWeight: isDemoMode ? 'bold' : 'normal',
});

const honeytrapInputStyles = (isDemoMode: boolean): React.CSSProperties => ({
    backgroundColor: isDemoMode ? '#fff' : 'transparent',
    color: isDemoMode ? '#333' : 'transparent',
    border: isDemoMode ? '1px solid #cc0000' : 'none',
    padding: isDemoMode ? '8px 12px' : 0,
    borderRadius: isDemoMode ? '4px' : 0,
    width: isDemoMode ? '100%' : 0,
});

const getDemoStyleLabel = (type: HoneytrapType): React.CSSProperties => ({
    display: 'block',
    marginBottom: '10px',
    color: '#cc0000',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'left',
});

// Props for the component
interface HoneytrapElementsProps {
    className?: string;
    isDemoMode?: boolean;
}

const HoneytrapElements: React.FC<HoneytrapElementsProps> = ({ className, isDemoMode = false }) => {
    const [trapType, setTrapType] = useState<HoneytrapType | null>(null);

    useEffect(() => {
        // Select a random trap type on mount
        const selectedTrap = selectRandomHoneytrap();
        setTrapType(selectedTrap);
    }, []);

    // Handler for when a honeytrap is triggered
    const handleTrapInteraction = () => {
        markBotInteraction();
    };

    // Return the appropriate honeytrap based on the selected type
    const renderHoneytrap = () => {
        switch (trapType) {
            case HoneytrapType.BUTTON:
                return (
                    <div style={honeytrapStyles(isDemoMode)}>
                        {isDemoMode && (
                            <div style={getDemoStyleLabel(trapType)}>
                                <i className="fas fa-flask"></i> HONEYTRAP - BUTTON TYPE
                                <div style={{ fontSize: '11px', fontWeight: 'normal', marginTop: '4px' }}>
                                    This button is invisible to users but bots might click it
                                </div>
                            </div>
                        )}
                        <div style={honeytrapContentStyles(isDemoMode)}>
                            <button
                                type="button"
                                onClick={handleTrapInteraction}
                                aria-hidden={!isDemoMode}
                                tabIndex={isDemoMode ? 0 : -1}
                                className="honeytrap-button"
                                style={honeytrapButtonStyles(isDemoMode)}
                            >
                                Search Availability
                            </button>
                        </div>
                    </div>
                );

            case HoneytrapType.INPUT:
                return (
                    <div style={honeytrapStyles(isDemoMode)}>
                        {isDemoMode && (
                            <div style={getDemoStyleLabel(trapType)}>
                                <i className="fas fa-flask"></i> HONEYTRAP - INPUT TYPE
                                <div style={{ fontSize: '11px', fontWeight: 'normal', marginTop: '4px' }}>
                                    This field is invisible to users but bots might fill it
                                </div>
                            </div>
                        )}
                        <div style={honeytrapContentStyles(isDemoMode)}>
                            <input
                                type="text"
                                name="honeytrap_name"
                                autoComplete="off"
                                placeholder="Your name"
                                onChange={handleTrapInteraction}
                                onFocus={handleTrapInteraction}
                                aria-hidden={!isDemoMode}
                                tabIndex={isDemoMode ? 0 : -1}
                                className="honeytrap-input"
                                style={honeytrapInputStyles(isDemoMode)}
                            />
                        </div>
                    </div>
                );

            case HoneytrapType.DATE:
                return (
                    <div style={honeytrapStyles(isDemoMode)}>
                        {isDemoMode && (
                            <div style={getDemoStyleLabel(trapType)}>
                                <i className="fas fa-flask"></i> HONEYTRAP - DATE TYPE
                                <div style={{ fontSize: '11px', fontWeight: 'normal', marginTop: '4px' }}>
                                    This date picker is invisible to users but bots might interact with it
                                </div>
                            </div>
                        )}
                        <div style={honeytrapContentStyles(isDemoMode)}>
                            <input
                                type="date"
                                name="honeytrap_date"
                                onChange={handleTrapInteraction}
                                onFocus={handleTrapInteraction}
                                aria-hidden={!isDemoMode}
                                tabIndex={isDemoMode ? 0 : -1}
                                className="honeytrap-date"
                                style={honeytrapInputStyles(isDemoMode)}
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className={`honeytrap-container ${className || ''}`} data-testid="honeytrap-container">
            {renderHoneytrap()}
        </div>
    );
};

export default HoneytrapElements;
