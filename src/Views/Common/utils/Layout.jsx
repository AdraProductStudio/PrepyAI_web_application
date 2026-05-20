import Sidebar from "Components/Panel_compnent/Sidebar";
import { Outlet } from "react-router-dom";
import JsonData from "./JsonData";
import Header from "Components/Panel_compnent/Header";
import { update_app_data } from "../Slices/Common_slice";
import { useDispatch } from "Components/CustomHooks";


export const Layout = () => { 
    const { jsonOnly } = JsonData();
    const dispatch = useDispatch();

    return (
        <div className="w-100 d-flex flex-wrap main_bg">
            <Sidebar responsiveOn="lg" menuOptions={jsonOnly?.sidebar_data} logoutOnClick={() => console.log("Logout clicked")} />

            <main className="col layout_main_content">
                <div className="container-fluid ">
                    <header className="py-2">
                        <Header offcanvasOn="lg" offcanvasOnButton={() => dispatch(update_app_data({ type: 'canvas', data: { show: true, from: 'sidebar', type: 'data', placement: 'start', close_btn: true, sidebar_data: jsonOnly.sidebar_data, extraClass: 'offcanvas_sidebar' } }))} />
                    </header>
                    <div className="pt-3 main_content_height">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}