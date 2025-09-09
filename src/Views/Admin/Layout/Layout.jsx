import { useCustomNavigate, useDispatch } from "Components/CustomHooks";
import Header from "Components/Panel_compnent/Header";
import Sidebar from "Components/Panel_compnent/Sidebar"
import { Outlet } from "react-router-dom";
import JsonData from "Views/Admin/Utils/JsonData";
import { logout, update_app_data } from "Views/Common/Slices/Common_slice";
import { OverallModel } from "../Utils/OverallModal";

export default function Layout() {
    const { jsonOnly } = JsonData();
    const dispatch = useDispatch();
    const navigate = useCustomNavigate()

    const profileOnClick = () => {
        navigate('/admin_dashboard/profile')
    }

    return (
        <div className="layout_main">
            <div className="d-flex flex-wrap">
                <Sidebar menuOptions={jsonOnly.sidebar_data} responsiveOn="lg" logoutOnClick={() => dispatch(logout())} />

                <main className="col layout_main_content overflow-auto">
                    <div className="container-fluid h-100">
                        <header className="py-2">
                            <Header offcanvasOn="lg" profileOnClick={profileOnClick} offcanvasOnButton={() => dispatch(update_app_data({ type: 'canvas', data: { show: true, from: 'sidebar', type: 'data', placement: 'start', close_btn: true, sidebar_data: jsonOnly.sidebar_data, extraClass: 'offcanvas_sidebar' } }))} />
                        </header>
                        <div className="pt-3 main_content_height">
                            <Outlet />
                            <OverallModel/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}