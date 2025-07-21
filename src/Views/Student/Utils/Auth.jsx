import { Outlet } from "react-router-dom"
import { OverallModel } from "./OverallModal"

export const StudentAuth = () => {
    
    return (
        <>
            <OverallModel />
            <Outlet />
        </>
    )
}