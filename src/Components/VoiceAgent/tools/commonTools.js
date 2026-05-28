import axiosInstance from "Services/axiosInstance";
import { speakText } from "Views/Common/Actions/voiceAgentActions";

/**
 * COMMON TOOLS
 * Actions available to ALL roles
 */

export const commonTools = async ({ name, payload, dispatch, navigate, role }) => {
    const dashboardMap = {
        student: "/student_dashboard",
        teacher: "/teachers_dashboard",
        admin: "/admin_dashboard",
        organization: "/organisation_dashboard",
        super_admin: "/superadmin_dashboard",
        learner: "/learners_dashboard",
    };

    const base = dashboardMap[role] || "";

    switch (name) {

        // ── Go to dashboard ─────────────────────────────────────────────────
        case "go_to_dashboard":
            navigate(`${base}/home`);
            dispatch(speakText("Taking you to your dashboard."));
            break;

        // ── Go to profile ───────────────────────────────────────────────────
        case "go_to_profile":
            navigate(`${base}/profile`);
            dispatch(speakText("Taking you to your profile."));
            break;

        // ── Go to settings ──────────────────────────────────────────────────
        case "go_to_settings":
            navigate(`${base}/profile`);
            dispatch(speakText("Opening your settings."));
            break;

        // ── Read current page ───────────────────────────────────────────────
        case "read_current_page":
            dispatch(speakText(`You are currently on the ${payload?.page_name || "current"} page. How can I help you here?`));
            break;

        // ── Logout ──────────────────────────────────────────────────────────
        case "logout": {
            try {
                await axiosInstance.post("/logout");
            } catch (e) {
                console.error("logout error:", e);
            }
            localStorage.clear();
            navigate("/");
            dispatch(speakText("You've been logged out. See you next time!"));
            break;
        }

        // ── Login by voice ──────────────────────────────────────────────────
        case "fill_login_form":
            // Dispatches a custom event for LoginForm to handle
            window.dispatchEvent(new CustomEvent("va_fill_login", {
                detail: { email: payload?.email, password: payload?.password }
            }));
            dispatch(speakText("I've filled in your login details. Shall I sign you in?"));
            break;

        default:
            dispatch(speakText("I'm not sure how to help with that. Could you try again?"));
            break;
    }
};
