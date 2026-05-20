import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    session_id: null,
    mode: "local",
    is_active: false,
    is_listening: false,
    is_speaking: false,
    is_loading: false,
    transcript: "",
    agent_reply: "",
    intent: null,
    action: null,
    conversation: [],
    config: null,
    error: null,
};

const voiceAgentSlice = createSlice({
    name: "voiceAgent",
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.session_id = action.payload.session_id;
            state.mode = action.payload.mode;
            state.is_active = true;
        },
        clearSession: (state) => {
            state.session_id = null;
            state.is_active = false;
            state.is_listening = false;
            state.is_speaking = false;
            state.conversation = [];
            state.transcript = "";
            state.agent_reply = "";
        },
        setListening: (state, action) => { state.is_listening = action.payload; },
        setSpeaking: (state, action) => { state.is_speaking = action.payload; },
        setLoading: (state, action) => { state.is_loading = action.payload; },
        setTranscript: (state, action) => { state.transcript = action.payload; },
        setAgentReply: (state, action) => { state.agent_reply = action.payload; },
        setIntent: (state, action) => { state.intent = action.payload; },
        setAction: (state, action) => { state.action = action.payload; },
        setConfig: (state, action) => { state.config = action.payload; },
        setError: (state, action) => { state.error = action.payload; },
        addConversation: (state, action) => {
            state.conversation.push(action.payload);
            if (state.conversation.length > 20) {
                state.conversation = state.conversation.slice(-20);
            }
        },
    },
});

export const {
    setSession, clearSession, setListening, setSpeaking,
    setLoading, setTranscript, setAgentReply, setIntent,
    setAction, setConfig, setError, addConversation,
} = voiceAgentSlice.actions;

export default voiceAgentSlice.reducer;
