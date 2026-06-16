import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMcpClient } from "@mcp-b/react-webmcp";
import {
    startVoiceSession, endVoiceSession,
    transcribeAudio, chatWithAgent,
    speakText, logActionResult,
    fetchVoiceAgentConfig,
          
} from "Views/Common/Actions/voiceAgentActions";
import { setListening, setError } from "Views/Common/Slices/voiceAgentSlice";

const LANGUAGE = "ta-IN";

const normalizeAction = (name, payload = {}) => {

    return { name, payload };
};

export const useVoiceAgent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { client, isConnected } = useMcpClient();
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const {
        session_id, is_active, is_listening,
        is_speaking, is_loading, transcript,
        agent_reply, conversation, config,
    } = useSelector((s) => s.voiceAgentState);

    // ─── Get available tools dynamically ─────────────────────────────────────
    const getAvailableTools = useCallback(async () => {
        if (!client || !isConnected) return [];
        try {
            const result = await client.listTools();
            const names = result.tools.map((t) => t.name);
            return result.tools; 
            //return names;
        } catch (e) {
            console.error("Failed to list tools:", e);
            return [];
        }
    }, [client, isConnected]);




    // ─── Load config ──────────────────────────────────────────────────────────

    const loadConfig = useCallback(() => {
        dispatch(fetchVoiceAgentConfig());
    }, [dispatch]);

    // ─── Start session ────────────────────────────────────────────────────────

    const startSession = useCallback(() => {
        dispatch(startVoiceSession((greeting) => {
            dispatch(speakText(greeting,LANGUAGE));
        }));
    }, [dispatch]);

    // ─── End session ─────────────────────────────────────────────────────────

    const endSession = useCallback(() => {
        if (session_id) dispatch(endVoiceSession(session_id));
    }, [dispatch, session_id]);

    // ─── Start recording ──────────────────────────────────────────────────────

    const startListening = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioChunksRef.current = [];
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                stream.getTracks().forEach((t) => t.stop());
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                await handleAudioReady(audioBlob);
            };

            mediaRecorder.start();
            dispatch(setListening(true));
        } catch (e) {
            dispatch(setError("Microphone access denied"));
            console.error("startListening error:", e);
        }
    }, [dispatch, session_id]);

    // ─── Stop recording ───────────────────────────────────────────────────────

    const stopListening = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
        }
    }, []);

    // ─── Execute action from AI ───────────────────────────────────────────────

    const executeAction = useCallback(async (action, action_id) => {
        try {
            const { name, payload } = normalizeAction(action.name, action.payload);

            if (!client || !isConnected) {
                throw new Error("MCP client is not connected");
            }

            const toolResult = await client.callTool(
                {
                name,
                arguments: payload || {} ,
                }
                // undefined,
                // {timeout: 300000 }  ,
            );
            
            const resultText = toolResult?.content
                ?.filter((b) => b.type === "text")
                ?.map((b) => b.text)
                ?.join("\n") || JSON.stringify(toolResult);
           


            if (action_id) dispatch(logActionResult(action_id, "success"));

            return { name, resultText, isError: toolResult?.isError };

        } catch (e) {
            console.error("executeAction error:", e);
            if (action_id) dispatch(logActionResult(action_id, "failed", e.message));
            return null;
        }
    }, [client, isConnected, dispatch]);


    const contextRef = useRef({});  

    const runAgentLoop = useCallback(async (userMessage, tools,language = "ta-IN") => {
        let message = userMessage;

        while (true) {
            const result = await dispatch(chatWithAgent(message, session_id, {
                available_tools: tools,
            },language));

            

            if (!result) {
                dispatch(speakText("மன்னிக்கவும், ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.",language));
                return;
            }

            const { reply, action, action_id } = result;

            if (!action) {
                dispatch(speakText(reply,language));
                return;
            }

        
            const enrichedAction = {
                ...action,
                //payload: { ...contextRef.current, ...action.payload },
                payload: action.payload,
            };



            const outcome = await executeAction(enrichedAction, action_id);

            if (!outcome) {
                message = `Tool ${action.name} failed unexpectedly. Inform the user and stop.`;
                continue;
            }

            
            try {
                const parsed = JSON.parse(outcome.resultText);
                if (parsed?.navigate_to) {
                    navigate(parsed.navigate_to); // 
                }
                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                    Object.assign(contextRef.current, parsed);
                }
            } catch (e) { /* not JSON, skip */ }
            message = outcome.isError
                ? `Tool ${outcome.name} returned an error: ${outcome.resultText}. Handle this appropriately.`
                : `Tool ${outcome.name} returned: ${outcome.resultText}. Collected context: ${JSON.stringify(contextRef.current)}`;
        }

    }, [session_id, dispatch, executeAction]);

    // ─── Handle audio → STT → agent loop ─────────────────────────────────────
    const handleAudioReady = useCallback(async (audioBlob) => {
        if (!session_id) return;

        const tools = await getAvailableTools();

        const transcript = await dispatch(transcribeAudio(audioBlob, session_id,LANGUAGE));
        if (!transcript) {
             dispatch(speakText("மன்னிக்கவும், தெளிவாக கேட்கவில்லை. மீண்டும் சொல்லுங்கள்.", LANGUAGE));
    
            return;
        }

        await runAgentLoop(transcript, tools,LANGUAGE);

    }, [session_id, dispatch, getAvailableTools, runAgentLoop]);


    // ─── Send text directly ───────────────────────────────────────────────────
    const sendTextMessage = useCallback(async (text) => {
        if (!session_id || !text.trim()) return;
        

        const tools = await getAvailableTools();
        await runAgentLoop(text, tools,LANGUAGE);

    }, [session_id, dispatch, getAvailableTools, runAgentLoop]);

    return {
        // State
        session_id, 
        is_active, 
        is_listening,
        is_speaking, 
        is_loading, 
        transcript,
        agent_reply, 
        conversation, 
        config,
        // Actions
        loadConfig,
        startSession,
        endSession,
        startListening,
        stopListening,
        sendTextMessage,
    };

    
};
