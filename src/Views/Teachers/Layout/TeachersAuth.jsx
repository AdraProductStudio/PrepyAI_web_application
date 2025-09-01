import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const TeachersAuth = () => {
    const { commonState } = useCommonState();
    const navigate = useCustomNavigate();

    useEffect(() => {
        if (window.location.pathname === "/teachers_dashboard" || window.location.pathname === "/teachers_dashboard/") {
            navigate("/teachers_dashboard/home");
        }
    }, [navigate])

    return commonState?.app_data?.token && commonState?.app_data?.user_role === "TEACHER" ? <Outlet /> : <Navigate to="/" replace />;
}

export default TeachersAuth;