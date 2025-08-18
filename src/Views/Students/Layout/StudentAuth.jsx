import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const StudentAuth = () => {
    const { commonState } = useCommonState();
    const navigate = useCustomNavigate();

    useEffect(() => {
        if (window.location.pathname === "/student_dashboard" || window.location.pathname === "/student_dashboard/") {
            navigate("/student_dashboard/home");
        }
    }, [navigate])

    return commonState?.app_data?.token && commonState?.app_data?.user_role === "STUDENT" ? <Outlet /> : <Navigate to="/" replace />;
}

export default StudentAuth;