import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const LearnersAuth = () => {
    const { commonState } = useCommonState();
    const navigate = useCustomNavigate();

    useEffect(() => {
        if (window.location.pathname === "/learners_dashboard" || window.location.pathname === "/learners_dashboard/") {
            navigate("/learners_dashboard/home");
        }
    }, [navigate])

    return commonState?.app_data?.token && commonState?.app_data?.user_role === "LEARNER" ? <Outlet /> : <Navigate to="/" replace />;
}

export default LearnersAuth;