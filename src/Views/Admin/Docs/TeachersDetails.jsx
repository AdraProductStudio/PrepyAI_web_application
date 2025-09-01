import ButtonComponent from "Components/Button/Button";
import { useCommonState } from "Components/CustomHooks";
import Icons from "Utils/Icons";
import SpinnerComponent from "Components/Spinner/Spinner";
import { updateEditClassroomTeacher } from "../Slices/adminSlice";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { useDispatch } from "react-redux";

const TeachersDetails = () => {
    const { adminState } = useCommonState();
    const dispatch = useDispatch();
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
                        adminState?.placeholder ?
                            <tr>
                                <td colSpan={7}> <SpinnerComponent /> </td>
                            </tr>
                            :
                            adminState?.teachersTableData.length > 0 && (
                                adminState?.teachersTableData.map((row, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{row?.staff_name}</td>
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
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TeachersDetails;