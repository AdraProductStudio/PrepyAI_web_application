import ButtonComponent from "Components/Button/Button";
import { useCommonState } from "Components/CustomHooks";
import Icons from "Utils/Icons";
import { updateEditClassroomTeacher } from "../Slices/adminSlice";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { handleGetTeachersTableData } from "../Actions/Admin_action";
import { useParams } from "react-router-dom";
import Spinner from "Components/Spinner/CustomSpinner";

const TeachersDetails = () => {
    const { id } = useParams()
    const { adminState } = useCommonState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleGetTeachersTableData({id}))
    }, [id, dispatch])

    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {['S.No', 'Staff Name', 'Subject', 'Contact No', 'Email', 'Qualification', 'Action']?.map((header, index) => (
                            <th key={index} className="text-center staff_table_heading">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="staff_table_data">
                    {
                        adminState?.placeholder 
                            ?
                            <tr>
                                <td colSpan={7} className="py-4" > <Spinner /> </td>
                            </tr>
                            :
                            adminState?.teachersTableData.length > 0 
                                ?
                                (adminState?.teachersTableData.map((row, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{row?.first_name} {row?.last_name}</td>
                                        <td className="text-center">{row?.subject_name}</td>
                                        <td className="text-center">{row?.contact_no}</td>
                                        <td className="text-center">{row?.email}</td>
                                        <td className="text-center">{row?.qualification}</td>
                                        <td className="text-center">
                                            <ButtonComponent type="button" className="btn-transparent" buttonName={Icons?.edit_icon} clickFunction={() => {
                                                dispatch(updateEditClassroomTeacher(row))
                                                dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "admin", modal_type: "edit_classroom_teacher" }))
                                            }}
                                            />
                                            <ButtonComponent type="button" className="btn-transparent`" buttonName={Icons?.delete_icons} clickFunction={() => {
                                                dispatch(updateEditClassroomTeacher(row))
                                                dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "admin", modal_type: "delete_classroom_teacher" }))
                                            }}
                                            />
                                        </td>
                                    </tr>
                                )))
                                :
                                <tr>
                                    <td colSpan={7}>No Data Found</td>
                                </tr>

                    }
                </tbody>
            </table>
        </div>
    )
}

export default TeachersDetails;