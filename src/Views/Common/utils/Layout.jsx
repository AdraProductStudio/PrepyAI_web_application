import Sidebar from "Components/Panel_compnent/Sidebar";
import { Outlet } from "react-router-dom";
import JsonData from "./JsonData";
import Header from "Components/Panel_compnent/Header";


export const Layout = () => {
    // const { commonState } = useCommonState();
    const { jsonOnly } = JsonData();

    return (
        <div className="w-100 d-flex flex-wrap main_bg">
            <Sidebar responsiveOn="lg" menuOptions={jsonOnly?.sidebar_data} logoutOnClick={() => console.log("Logout clicked")} />

            <main className="col layout_main_content">
                <div className="container-fluid ">
                    <header className="py-2">
                        <Header offcanvasOn="lg" />
                    </header>
                    <div className="pt-3 main_content_height">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}