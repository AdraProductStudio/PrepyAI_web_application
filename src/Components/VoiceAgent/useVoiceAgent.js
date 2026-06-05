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
            console.log("AVAILABLE TOOLS:", names);

            return result.tools; // ← full objects with name
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

    // const executeAction = useCallback(async (action, action_id) => {
    //     try {
    //         const { name, payload } = normalizeAction(action.name, action.payload);
    //         console.log("ACTION RECEIVED:", name, payload);
    //         console.log("MCP STATUS:", { isConnected, hasClient: Boolean(client) });

    //         switch (name) {
    //             case "navigate_to":
    //                 if (payload?.route) navigate(payload.route);
    //                 break;

    //             default:
    //         if (!client || !isConnected) {
    //             throw new Error("MCP client is not connected");
    //         }

    //                 const toolResult = await client.callTool({
    //                     name,
    //                     arguments: payload || {},
    //                 });
    //                 console.log("MCP TOOL RESULT:", toolResult);
                    

    //         const finalResult = await dispatch(chatWithAgent(
    //                     `Tool ${name} returned: ${JSON.stringify(toolResult)}`,
    //             session_id,
    //                     {
    //                         tool_name: name,
    //                         tool_result: toolResult,
    //                     }
    //         ));

    //         if (finalResult?.reply) {
    //                     console.log("FINAL CHAT RESULT:", finalResult);
    //             dispatch(speakText(finalResult.reply));
    //                 }
    //                 break;
    //         }

    //         if (action_id) dispatch(logActionResult(action_id, "success"));

    //     } catch (e) {
    //         console.error("executeAction error:", e);
    //         if (action_id) dispatch(logActionResult(action_id, "failed", e.message));
    //     }
    // }, [navigate, dispatch, client, isConnected, session_id]);




    // ─── Execute action from AI ───────────────────────────────────────────────

    // const executeAction = useCallback(async (action, action_id, tools = []) => {
    //     try {
    //         const { name, payload } = normalizeAction(action.name, action.payload);
    //         console.log("ACTION RECEIVED:", name, payload);
    //         console.log("MCP STATUS:", { isConnected, hasClient: Boolean(client) });

    //         switch (name) {
    //             case "student_navigate":
    //                 if (payload?.route) navigate(payload.route);
    //                 break;

    //             default:
    //                 if (!client || !isConnected) {
    //                     throw new Error("MCP client is not connected");
    //                 }

    //                 const toolResult = await client.callTool({
    //                     name,
    //                     arguments: payload || {},
    //                 });
    //                 console.log("MCP TOOL RESULT:", toolResult);

    //                 const resultText = toolResult?.content
    //                     ?.filter((b) => b.type === "text")
    //                     ?.map((b) => b.text)
    //                     ?.join("\n") || JSON.stringify(toolResult);
    //                 console.log("RESULT TEXT SENT TO CLAUDE:", resultText); 

    //                 const finalResult = await dispatch(chatWithAgent(
    //                     `Tool ${name} returned: ${resultText}`,
    //                     session_id,
    //                     {
    //                         tool_name: name,
    //                         tool_result: toolResult,
    //                         available_tools: tools,
    //                     }
    //                 ));

    //                 if (finalResult?.reply) {
    //                     console.log("FINAL CHAT RESULT:", finalResult);
    //                     dispatch(speakText(finalResult.reply));
    //                 }
    //                 break;
    //         }

    //         if (action_id) dispatch(logActionResult(action_id, "success"));

    //     } catch (e) {
    //         console.error("executeAction error:", e);
    //         if (action_id) dispatch(logActionResult(action_id, "failed", e.message));
    //     }
    // }, [navigate, dispatch, client, isConnected, session_id]);
    


    // // ─── Handle audio → STT → AI → TTS → Action ──────────────────────────────

    // const handleAudioReady = useCallback(async (audioBlob) => {
    //     if (!session_id) return;

    //     const tools = await getAvailableTools();

    //     const transcript = await dispatch(transcribeAudio(audioBlob, session_id));
    //     if (!transcript) {
    //         dispatch(speakText("Sorry, I couldn't hear that clearly. Could you say it again?"));
    //         return;
    //     }

    //     const result = await dispatch(chatWithAgent(transcript, session_id, {
    //         available_tools: tools,
    //     }));

    //     console.log("VOICE CHAT RESULT:", result);
    //     if (!result) {
    //         dispatch(speakText("Something went wrong. Please try again."));
    //         return;
    //     }

    //     const { reply, action, action_id } = result;

    //     if (action) {
    //         await executeAction(action, action_id, tools);
    //     } else {
    //         dispatch(speakText(reply));
    //     }

    // }, [session_id, dispatch, executeAction, getAvailableTools]);

    // // ─── Send text directly (for testing without mic) ─────────────────────────

    

    // const sendTextMessage = useCallback(async (text) => {
    //     if (!session_id || !text.trim()) return;
    //     console.log("VOICE TEXT MESSAGE:", text);

    //     const tools = await getAvailableTools();

    //     const result = await dispatch(chatWithAgent(text, session_id, {
    //         available_tools: tools,
    //     }));

    //     console.log("VOICE CHAT RESULT:", result);
    //     if (result?.reply) {
    //         if (result.action) {
    //             await executeAction(result.action, result.action_id, tools);
    //         } else {
    //             dispatch(speakText(result.reply));
    //         }
    //     }
    // }, [session_id, dispatch, executeAction, getAvailableTools]);



    // ─── Execute single tool call ─────────────────────────────────────────────
    const executeAction = useCallback(async (action, action_id) => {
        try {
            const { name, payload } = normalizeAction(action.name, action.payload);
            console.log("ACTION RECEIVED:", name, payload);

            if (!client || !isConnected) {
                throw new Error("MCP client is not connected");
            }

            const toolResult = await client.callTool({
                name,
                arguments: payload || {},
            });
            console.log("MCP TOOL RESULT:", toolResult);
            console.log("RAW TOOL RESULT:", JSON.stringify(toolResult, null, 2)); // ← add this

            const resultText = toolResult?.content
                ?.filter((b) => b.type === "text")
                ?.map((b) => b.text)
                ?.join("\n") || JSON.stringify(toolResult);
            console.log("RESULT TEXT SENT TO CLAUDE:", resultText);


            if (action_id) dispatch(logActionResult(action_id, "success"));

            return { name, resultText, isError: toolResult?.isError };

        } catch (e) {
            console.error("executeAction error:", e);
            if (action_id) dispatch(logActionResult(action_id, "failed", e.message));
            return null;
        }
    }, [client, isConnected, dispatch]);


    const contextRef = useRef({});  // add this near the top of useVoiceAgent

    const runAgentLoop = useCallback(async (userMessage, tools,language = "ta-IN") => {
        let message = userMessage;

        while (true) {
            const result = await dispatch(chatWithAgent(message, session_id, {
                available_tools: tools,
            },language));

            console.log("AGENT LOOP RESULT:", result);

            if (!result) {
                dispatch(speakText("Something went wrong. Please try again.",language));
                return;
            }

            const { reply, action, action_id } = result;

            if (!action) {
                dispatch(speakText(reply,language));
                return;
            }

            

            console.log("ACTION PAYLOAD FROM CLAUDE:", action.payload);
            console.log("CURRENT CONTEXT:", contextRef.current);

            const enrichedAction = {
                ...action,
                //payload: { ...contextRef.current, ...action.payload },
                payload: action.payload,
            };

            console.log("ENRICHED PAYLOAD:", enrichedAction.payload);

            const outcome = await executeAction(enrichedAction, action_id);

            if (!outcome) {
                message = `Tool ${action.name} failed unexpectedly. Inform the user and stop.`;
                continue;
            }

            // Merge result into persistent context
            try {
                const parsed = JSON.parse(outcome.resultText);
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
            dispatch(speakText("Sorry, I couldn't hear that clearly. Could you say it again?"));
            return;
        }

        await runAgentLoop(transcript, tools,LANGUAGE);

    }, [session_id, dispatch, getAvailableTools, runAgentLoop]);


    // ─── Send text directly ───────────────────────────────────────────────────
    const sendTextMessage = useCallback(async (text) => {
        if (!session_id || !text.trim()) return;
        console.log("VOICE TEXT MESSAGE:", text);

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
