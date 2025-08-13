import ButtonComponent from "Components/Button/Button";
import { useDispatch } from "react-redux";
import Icons from "Utils/Icons";
import { handleGetStudentsTableData } from "../Actions/Admin_action";
import { useCommonState } from "Components/CustomHooks";
import { useEffect } from "react";
import SpinnerComponent from "Components/Spinner/Spinner";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const { adminState } = useCommonState();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(handleGetStudentsTableData({ id }));
        }
    }, [id, dispatch]);

    useEffect(() => {
        dispatch(handleGetStudentsTableData({id: adminState?.classroom_id}))
    }, [adminState?.classroom_id, dispatch])
    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {['S.No', 'Student Name', 'Contact No', 'Email', 'Status', 'No Of Attempts', 'Reg no', 'Action']?.map((header, index) => (
                            <th key={index} className="text-center staff_table_heading">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="staff_table_data">
                    { 
                        adminState?.placeholder ?
                            <div className="d-flex justify-content-center align-items-center">
                                <SpinnerComponent />
                            </div>
                        :
                        adminState?.studentsTableData.length > 0 &&
                            adminState?.studentsTableData.map((row, index) => (
                                <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{row?.student_name}</td>
                                    <td className="text-center">{row?.contact_no}</td>
                                    <td className="text-center">{row?.email}</td>
                                    <td className="text-center">{row?.status}</td>
                                    <td className="text-center">{row?.no_of_attempts}</td>
                                    <td className="text-center">{row?.register_no}</td>
                                    <td className="text-center">
                                        <ButtonComponent type="button" className="btn-transparent`" buttonName={Icons?.delete_icons} />
                                    </td>
                                </tr>
                            ))
                        }
                </tbody>
            </table>
        </div>
    )
}

export default StudentDetails;