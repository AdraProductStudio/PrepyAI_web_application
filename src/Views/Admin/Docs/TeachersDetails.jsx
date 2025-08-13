import ButtonComponent from "Components/Button/Button"; 
import { useCommonState } from "Components/CustomHooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Icons from "Utils/Icons";
import { handleGetTeachersTableData } from "../Actions/Admin_action";
import SpinnerComponent from "Components/Spinner/Spinner";
import { useParams } from "react-router-dom";

const TeachersDetails = () => {
    const { adminState } = useCommonState();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(handleGetTeachersTableData({ id }));
        }
    }, [id, dispatch]);

    useEffect(() => {
        dispatch(handleGetTeachersTableData({id: adminState?.classroom_id}))
    }, [adminState?.classroom_id, dispatch])

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
                            <div className="d-flex justify-content-center align-items-center">
                                <SpinnerComponent />
                            </div>
                        :
                        adminState.placeholder ? 
                            <div className="d-flex justify-content-center align-items-center w-100">
                                <SpinnerComponent />
                            </div> 
                        :
                        adminState?.teachersTableData.length > 0 &&
                            adminState?.teachersTableData.map((row, index) => (
                                <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{row?.staff_name}</td>
                                    <td className="text-center">{row?.subject_name}</td>
                                    <td className="text-center">{row?.contact_no}</td>
                                    <td className="text-center">{row?.email}</td>
                                    <td className="text-center">{row?.qualification}</td>           
                                    <td className="text-center">
                                        <ButtonComponent type="button" className="btn-transparent" buttonName={Icons?.edit_icon} />
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

export default TeachersDetails;