import { Outlet } from "react-router-dom";
import Header from "Components/Panel_compnent/Header";
import { OverallModel } from "../Utils/OverallModal";


export default function McqTestLayout() {

    return (
        <div className="w-100">
            <main className="">
                <div className="container-fluid ">
                    <header className="mb-2">
                        <Header offcanvasOn="xl" />
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