// import { useCommonState } from "Components/CustomHooks";
import Sidebar from "Components/Panel_compnent/Sidebar";
import { Outlet } from "react-router-dom";
import JsonData from "Views/Students/Utils/JsonData.jsx";
import Header from "Components/Panel_compnent/Header";
import { useDispatch } from "Components/CustomHooks";
import { logout } from "Views/Common/Slices/Common_slice";
import { useCustomNavigate } from "Components/CustomHooks";
import { useEffect } from "react";
import { OverallModel } from "../Utils/OverallModal";


const Layout = () => {
    const { jsonOnly } = JsonData();
    const dispatch = useDispatch();
    const navigate = useCustomNavigate()

    return (
        <div className="w-100 d-flex flex-wrap main_bg">
            <Sidebar responsiveOn="xl" menuOptions={jsonOnly?.sidebar_data} logoutOnClick={() => console.log("Logout clicked")} />

            <main className="col layout_main_content">
                <div className="container-fluid ">
                    <header className="py-2">
                        <Header offcanvasOn="xl" profileOnClick={()=> navigate('/student_dashboard/profile')} />
                    </header>
                    <div className="pt-3 main_content_height overflowY">
                        <Outlet />
                        <OverallModel />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Layout;