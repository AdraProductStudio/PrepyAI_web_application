import Cookies from "js-cookie";
import { decryptData, encryptData } from "Security/Crypto/Crypto";

export function decryption() {
    return decryptData(Cookies.get('project_log'))
}

export function encryption(data) {
    return encryptData(data)
}

export function decrypt_app_data_logs() {
    let logs = Cookies.get("project_log") ? decryptData(Cookies.get("project_log")) : null;
    let path = window.location.pathname?.split("/")[1] || ''

    if (logs) {
        switch (path) {
            case 'admin_dashboard':
                return logs['ADMIN'] || {}

            case 'teachers_dashboard':
                return logs['TEACHER'] || {}

            case 'student_dashboard':
                return logs['STUDENT'] || {}

            case 'learners_dashboard':
                return logs['LEARNER'] || {}

            case 'superadmin_dashboard':
                return logs['SUPER_ADMIN'] || {}

            case 'organisation_dashboard':
                return logs['ORGANIZATION'] || {}

            default:
                return {}
        }
    }
    return {};
}

export function view_logout() {
    let logs = Cookies.get("project_log") ? decryptData(Cookies.get("project_log")) : {}
    let path = window.location.pathname?.split("/")[1] || ''
    
    if (Object.keys(logs)?.length > 1) {
        switch (path) {
            case 'admin_dashboard':
                delete logs['ADMIN'];
                Cookies.set('project_log', encryptData(logs));
                break;

            case 'teachers_dashboard':
                delete logs['TEACHER'];
                Cookies.set('project_log', encryptData(logs));
                break;

            case 'student_dashboard':
                delete logs['STUDENT'];
                Cookies.set('project_log', encryptData(logs));
                break;

            case 'learners_dashboard':
                delete logs['LEARNER'];
                Cookies.set('project_log', encryptData(logs));
                break;

            case 'superadmin_dashboard':
                delete logs['SUPER_ADMIN'];
                Cookies.set('project_log', encryptData(logs));
                break;

            case 'organisation_dashboard':
                delete logs['ORGANIZATION'];
                Cookies.set('project_log', encryptData(logs));
                break;

            default:
                break;

        }
    } else {
        Cookies.remove('project_log')
    }
}