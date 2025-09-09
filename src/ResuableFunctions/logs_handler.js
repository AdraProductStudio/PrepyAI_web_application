import LZString from "lz-string";
import { decryptData, encryptData } from "Security/Crypto/Crypto";

export function decryption() {
    return decryptData(localStorage.getItem('project_log'))
}

export function encryption(data) {
    return encryptData(data)
}

function getLogs() {
    const raw = localStorage.getItem("project_log");
    if (!raw) return {};

    try {
        const decrypted = decryptData(raw);
        const decompressed = JSON.parse(LZString.decompressFromUTF16(decrypted));
        return decompressed || {};
    } catch (err) {
        console.error("Failed to parse logs:", err);
        return {};
    }
}

function setLogs(logs) {
    try {
        const compressed = LZString.compressToUTF16(JSON.stringify(logs));
        const encrypted = encryptData(compressed);
        localStorage.setItem("project_log", encrypted);
    } catch (err) {
        console.error("Failed to save logs:", err);
    }
}

export function decrypt_app_data_logs() {
    const logs = getLogs();
    const path = window.location.pathname?.split("/")[1] || "";

    if (!Object.keys(logs).length) return {};

    let role = "";
    if (path === "admin_dashboard") role = "ADMIN";
    else if (path === "teachers_dashboard") role = "TEACHER";
    else if (path === "student_dashboard") role = "STUDENT";
    else if (path === "learners_dashboard") role = "LEARNER";
    else if (path === "superadmin_dashboard") role = "SUPER_ADMIN";
    else if (path === "organisation_dashboard") role = "ORGANIZATION";

    // Find matching role object
    return Object.values(logs).find(val => val?.user_role === role) || {};
}

export function view_logout() {
    const logs = getLogs();
    const path = window.location.pathname?.split("/")[1] || "";

    if (!Object.keys(logs).length) {
        localStorage.removeItem("project_log");
        return;
    }

    let role = "";
    if (path === "admin_dashboard") role = "ADMIN";
    else if (path === "teachers_dashboard") role = "TEACHER";
    else if (path === "student_dashboard") role = "STUDENT";
    else if (path === "learners_dashboard") role = "LEARNER";
    else if (path === "superadmin_dashboard") role = "SUPER_ADMIN";
    else if (path === "organisation_dashboard") role = "ORGANIZATION";

    // ✅ delete by role_name inside values
    const updatedLogs = Object.fromEntries(
        Object.entries(logs).filter(([_, val]) => val?.user_role !== role)
    );

    if (Object.keys(updatedLogs).length) {
        setLogs(updatedLogs);
    } else {
        localStorage.removeItem("project_log");
    }
}
