export function LoginSuccessNavigateTo(user_role, navigate) {
    console.log(user_role)
    switch (user_role) {
        case "LEARNER":
            navigate("/user_dashboard");
            break;
            
        default:
            break;
    }
}