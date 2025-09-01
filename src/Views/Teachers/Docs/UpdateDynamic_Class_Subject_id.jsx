import { useDispatch } from "Components/CustomHooks";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom"
import { updateParams } from "../Slice/teachersSlice";

export const UpdateDynamic_Class_Subject_id = () => {
    const { class_id, subject_id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateParams({ class_id, subject_id }))
    }, [])

    return <Outlet />
}