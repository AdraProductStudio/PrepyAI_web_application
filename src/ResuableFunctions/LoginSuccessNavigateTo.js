export function LoginSuccessNavigateTo(user_role, navigate) {
    switch (user_role) {
        case "user":
            navigate("/user_dashboard");
            break;
            
        default:
            break;
    }
}