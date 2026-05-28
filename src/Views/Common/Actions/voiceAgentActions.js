import axiosInstance from "Services/axiosInstance";
import {
    setSession, clearSession, setLoading,
    setTranscript, setAgentReply, setIntent,
    setAction, setConfig, setError, addConversation,
    setListening, setSpeaking,
} from "Views/Common/Slices/voiceAgentSlice";

// ─── Get config from backend ──────────────────────────────────────────────────

export const fetchVoiceAgentConfig = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get("/voice_agent/config");
        if (res.data.success) {
            dispatch(setConfig(res.data.data));
        }
    } catch (e) {
        console.error("fetchVoiceAgentConfig error:", e);
    }
};

// ─── Start session ────────────────────────────────────────────────────────────

export const startVoiceSession = (onGreeting) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await axiosInstance.post("/voice_agent/start_session");
        if (res.data.success) {
            const { session_id, mode, greeting } = res.data.data;
            dispatch(setSession({ session_id, mode }));
            dispatch(addConversation({ speaker: "agent", message: greeting }));
            if (onGreeting) onGreeting(greeting);
        }
    } catch (e) {
        dispatch(setError("Could not start voice session"));
        console.error("startVoiceSession error:", e);
    } finally {
        dispatch(setLoading(false));
    }
};

// ─── End session ──────────────────────────────────────────────────────────────

export const endVoiceSession = (session_id) => async (dispatch) => {
    try {
        await axiosInstance.post("/voice_agent/end_session", { session_id });
        dispatch(clearSession());
    } catch (e) {
        console.error("endVoiceSession error:", e);
        dispatch(clearSession());
    }
};

// ─── Speech to text ───────────────────────────────────────────────────────────

export const transcribeAudio = (audioBlob, session_id) => async (dispatch) => {
    try {
        dispatch(setListening(false));
        dispatch(setLoading(true));

        const formData = new FormData();
        formData.append("audio", audioBlob, "audio.wav");
        formData.append("session_id", session_id);

        const res = await axiosInstance.post("/voice_agent/stt", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.data.success) {
            const transcript = res.data.data.transcript;
            dispatch(setTranscript(transcript));
            dispatch(addConversation({ speaker: "user", message: transcript }));
            return transcript;
        }
        return null;
    } catch (e) {
        dispatch(setError("Could not transcribe audio"));
        console.error("transcribeAudio error:", e);
        return null;
    } finally {
        dispatch(setLoading(false));
    }
};

// ─── Chat with AI ─────────────────────────────────────────────────────────────

export const chatWithAgent = (message, session_id, context = {}) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const res = await axiosInstance.post("/voice_agent/chat", {
            session_id,
            message,
            context,
        });

        if (res.data.success) {
            const { reply, intent, action, action_id } = res.data.data;
            dispatch(setAgentReply(reply));
            dispatch(setIntent(intent));
            dispatch(setAction(action));
            dispatch(addConversation({ speaker: "agent", message: reply }));
            return { reply, intent, action, action_id };
        }
        return null;
    } catch (e) {
        dispatch(setError("Could not get agent response"));
        console.error("chatWithAgent error:", e);
        return null;
    } finally {
        dispatch(setLoading(false));
    }
};

// ─── Text to speech ───────────────────────────────────────────────────────────

export const speakText = (text) => async (dispatch) => {
    try {
        dispatch(setSpeaking(true));

        const res = await axiosInstance.post("/voice_agent/tts", { text });

        if (res.data.success) {
            const { audio_base64 } = res.data.data;
            const audioBytes = atob(audio_base64);
            const arrayBuffer = new ArrayBuffer(audioBytes.length);
            const uint8 = new Uint8Array(arrayBuffer);
            for (let i = 0; i < audioBytes.length; i++) {
                uint8[i] = audioBytes.charCodeAt(i);
            }
            const blob = new Blob([arrayBuffer], { type: "audio/wav" });
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.onended = () => {
                dispatch(setSpeaking(false));
                URL.revokeObjectURL(url);
            };
            audio.onerror = () => dispatch(setSpeaking(false));
            await audio.play();
        }
    } catch (e) {
        dispatch(setSpeaking(false));
        console.error("speakText error:", e);
    }
};

// ─── Log action result ────────────────────────────────────────────────────────

export const logActionResult = (action_id, result, error_message = null) => async () => {
    try {
        await axiosInstance.post("/voice_agent/log_action", {
            action_id,
            result,
            error_message,
        });
    } catch (e) {
        console.error("logActionResult error:", e);
    }
};


