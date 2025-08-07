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
    let path = window.location.pathname;

    if (logs) {
        switch (true) {
            case path?.includes('admin_dashboard'):
                return logs['ADMIN'] || {}

            case path?.includes('teachers_dashboard'):
                return logs['TEACHER'] || {}

            case path?.includes('student_dashboard'):
                return logs['STUDENT'] || {}

            case path?.includes('learners_dashboard'):
                return logs['LEARNER'] || {}

            case path?.includes('superadmin_dashboard'):
                return logs['SUPER_ADMIN'] || {}

            case path?.includes('organisation_dashboard'):
                return logs['ORGANIZATION'] || {}

            default:
                return {}
        }
    }
    return {};
}

export function view_logout() {
    let logs = Cookies.get("project_log") ? decryptData(Cookies.get("project_log")) : {}
    let path = window.location.pathname;

    if (Object.keys(logs)?.length > 1) {
        switch (true) {
            case path?.includes('admin_dashboard'):
                delete logs['ADMIN'];
                Cookies.set('project_log', encryptData(logs));
                break;

            case path?.includes('teachers_dashboard'):
                delete logs['TEACHER'];
                Cookies.set('project_log', encryptData(logs));
                break;

            case path?.includes('student_dashboard'):
                delete logs['STUDENT'];
                Cookies.set('project_log', encryptData(logs));
                break;

            case path?.includes('learners_dashboard'):
                delete logs['LEARNER'];
                Cookies.set('project_log', encryptData(logs));
                break;

            case path?.includes('superadmin_dashboard'):
                delete logs['SUPER_ADMIN'];
                Cookies.set('project_log', encryptData(logs));
                break;

            case path?.includes('organisation_dashboard'):
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