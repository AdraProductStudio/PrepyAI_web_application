import Cookies from "js-cookie";
import { decryptData, encryptData } from "Security/Crypto/Crypto";

export function decryption() {
    return decryptData(Cookies.get('project_log'))
}

export function encryption(data) {
    return encryption(data)
}

export function decrypt_app_data_logs() {
    let logs = Cookies.get("project_log") ? decryptData(Cookies.get("project_log")) : null
    let path = window.location.pathname;

    if (logs) {
        switch (true) {
            case path?.includes('admin'):
                return logs['admin'] || {}

            case path?.includes('student'):
                return logs['student'] || {}

            default:
                return null
        }
    }
    return null
}

export function view_logout() {
    let logs = Cookies.get("project_log") ? decryptData(Cookies.get("project_log")) : null
    let path = window.location.pathname;

    if (Object.keys(logs)?.length > 1) {
        switch (true) {
            case path?.includes('admin'):
                delete logs['admin'];
                Cookies.set('project_log', encryptData(logs));
                break;

            default:
                break;

        }
    } else {
        Cookies.remove('project_log')
    }
}