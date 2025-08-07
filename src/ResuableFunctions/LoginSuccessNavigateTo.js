export function LoginSuccessNavigateTo(user_role, navigate) {
    switch (user_role) {
        case "ADMIN":
            navigate("/admin_dashboard/home");
            break;
        case "TEACHER":
            navigate("/teachers_dashboard/home");
            break;
        case "STUDENT":
            navigate("/student_dashboard/home");
            break;
        case "LEARNER":
            navigate("/learners_dashboard/home");
            break;
        case "SUPER_ADMIN":
            navigate("/superadmin_dashboard/home");
            break;
        case "ORGANIZATION":
            navigate("/organisation_dashboard/home");
            break;
        default:
            break;
    }
}