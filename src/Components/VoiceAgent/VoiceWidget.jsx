import React, { useEffect, useState, useRef } from "react";
import { useVoiceAgent } from "./useVoiceAgent";

import "./VoiceWidget.css";

const VoiceWidget = () => {
    const [expanded, setExpanded] = useState(false);
    const [textInput, setTextInput] = useState("");
    const conversationEndRef = useRef(null);

    const {
        is_active, is_listening, is_speaking, is_loading,
        transcript, agent_reply, conversation,
        loadConfig, startSession, endSession,
        startListening, stopListening, sendTextMessage,
    } = useVoiceAgent();

    // Load config on mount
    useEffect(() => { loadConfig(); }, []);

    // Auto scroll conversation
    useEffect(() => {
        conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversation]);

    const handleMicClick = () => {
        if (!is_active) return;
        if (is_listening) stopListening();
        else startListening();
    };

    const handleToggle = () => {
        if (!expanded) {
            setExpanded(true);
            if (!is_active) startSession();
        } else {
            setExpanded(false);
        }
    };

    const handleClose = () => {
        setExpanded(false);
        endSession();
    };

    const handleTextSend = () => {
        if (!textInput.trim()) return;
        sendTextMessage(textInput);
        setTextInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleTextSend();
    };

    return (
        <div className={`va-widget ${expanded ? "va-expanded" : ""}`}>

            {/* Expanded panel */}
            {expanded && (
                <div className="va-panel">
                    {/* Header */}
                    <div className="va-header">
                        <div className="va-header-left">
                            
                            <div className={`va-status-dot ${is_active ? "active" : ""}`} />
                            <span className="va-title">PrepyAI Assistant</span>
                        </div>
                        <button className="va-close-btn" onClick={handleClose}>
                            <i className="fa fa-times" />
                        </button>
                    </div>

                    {/* Conversation */}
                    <div className="va-conversation">
                        {conversation.length === 0 && (
                            <div className="va-empty">
                                <i className="fa fa-microphone va-empty-icon" />
                                <p>Starting your session...</p>
                            </div>
                        )}
                        {conversation.map((msg, i) => (
                            <div key={i} className={`va-message va-message-${msg.speaker}`}>
                                <div className="va-bubble">{msg.message}</div>
                            </div>
                        ))}
                        {is_loading && (
                            <div className="va-message va-message-agent">
                                <div className="va-bubble va-typing">
                                    <span /><span /><span />
                                </div>
                            </div>
                        )}
                        <div ref={conversationEndRef} />
                    </div>

                    {/* Mic button */}
                    <div className="va-mic-area">
                        <button
                            className={`va-mic-btn ${is_listening ? "listening" : ""} ${is_speaking ? "speaking" : ""}`}
                            onClick={handleMicClick}
                            disabled={is_loading || is_speaking || !is_active}
                        >
                            <i className={`fa ${is_listening ? "fa-stop" : "fa-microphone"}`} />
                            {is_listening && <div className="va-pulse" />}
                        </button>
                        <p className="va-mic-hint">
                            {is_speaking ? "Speaking..." :
                                is_listening ? "Listening... tap to stop" :
                                    is_loading ? "Thinking..." :
                                        "Tap to speak"}
                        </p>
                    </div>

                    {/* Text input fallback */}
                    <div className="va-text-input">
                        <input
                            type="text"
                            placeholder="Or type here..."
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={is_loading || is_speaking}
                        />
                        <button onClick={handleTextSend} disabled={!textInput.trim() || is_loading}>
                            <i className="fa fa-paper-plane" />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating button */}
            <button
                className={`va-fab ${is_listening ? "listening" : ""} ${is_speaking ? "speaking" : ""}`}
                onClick={handleToggle}
                title="Voice Assistant"
            >
                <i className={`fa ${expanded ? "fa-chevron-down" : "fa-microphone"}`} />
                {(is_listening || is_speaking) && <div className="va-fab-pulse" />}
            </button>
        </div>
    );
};

export default VoiceWidget;
