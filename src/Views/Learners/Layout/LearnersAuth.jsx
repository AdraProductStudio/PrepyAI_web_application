import { useCommonState } from "Components/CustomHooks";
import { Navigate, Outlet } from "react-router-dom";

const LearnersAuth = () => {
    const { commonState } = useCommonState();

    return commonState?.app_data?.token && commonState?.app_data?.user_role === "LEARNER" ? <Outlet /> : <Navigate to="/" replace />;
}

export default LearnersAuth;