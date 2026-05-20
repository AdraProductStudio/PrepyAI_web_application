import ButtonComponent from "Components/Button/Button";
import ClassroomCard from "Components/Card/ClassroomCard";
import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Icons from "Utils/Icons";
import Image from "Utils/Image";
import { handleGetCreateClassroomModalTeachers, handleGetAllClassrooms } from "../Actions/Admin_action";
import { handleUpdateClassroomName, updateDeleteClassroomData } from "../Slices/adminSlice";
import { OverallModel } from "../Utils/OverallModal";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import Spinner from "Components/Spinner/CustomSpinner";

const Classroom = () => {
    const navigate = useCustomNavigate();
    const dispatch = useDispatch();
    const { adminState } = useCommonState()

    useEffect(() => {
        dispatch(handleGetAllClassrooms())
    }, [dispatch])

    return (
        <>
            <div className="h-100">
                <div className="container-fluid">
                    <div className="w-100 row justify-content-between align-items-center border-bottom pb-3">
                        <div className="col">
                            <h5 className="mb-0">Classrooms</h5>
                        </div>
                        <div className="col text-end">
                            <ButtonComponent 
                                type="button" 
                                className="btn-brand-color border py-2 px-2 px-md-3"
                                clickFunction={() => {
                                    dispatch(handleGetCreateClassroomModalTeachers())
                                    dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "admin", modal_type: "create_classroom" }))}
                                }
                            >
                                {Icons.add_icon}
                                <span className="lign-middle">Create Classroom</span>
                            </ButtonComponent>
                        </div>
                    </div>

                    <div className="w-100 d-flex flex-wrap small_header_content_main overflowY">
                        { 
                            adminState.placeholder 
                            ? 
                            <div className="d-flex justify-content-center align-items-center w-100">
                                <Spinner />
                            </div> 
                            :
                            adminState?.classroomsJson.length > 0 
                                ? 
                                (adminState?.classroomsJson.map((item, index) => (
                                    <div className="col-12 col-md-6 col-xl-4 col-xxl-3 p-2" key={item.id}>
                                        <ClassroomCard 
                                            cardClassName="w-100" 
                                            data={item} buttonName="View" 
                                            onclick={() => {
                                                dispatch(handleUpdateClassroomName(item.classroom_name))
                                                navigate(`/admin_dashboard/classrooms/${item.id}/teachers`)
                                            }}
                                            onClickDelete={ () => {
                                                dispatch(updateDeleteClassroomData(item))
                                                dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "admin", modal_type: "delete_classroom" }))
                                            }}
                                        />
                                    </div>
                                )))
                                :
                                <div className="w-100 h-100 d-flex flex-wrap align-items-center justify-content-center">
                                    <div className="col-6 text-center">
                                        <Img src={Image?.no_data_found} alt="No classes Found" className="no_data_found_image" />
                                        <h6>No classes were added</h6>
                                        <p className="fs-15 text-secondary">Create and send the link to your students to join the classes.</p>
                                        <ButtonComponent 
                                            type="button" className="btn-brand-color border py-2"
                                            clickFunction={() => {
                                                dispatch(handleGetCreateClassroomModalTeachers())
                                                dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "admin", modal_type: "create_classroom" }))}
                                            }
                                        >
                                            {Icons.add_icon}
                                            <span className="lign-middle">Create Classroom</span>
                                        </ButtonComponent>
                                    </div>
                                </div>
                        }
                        
                    </div>
                </div>
            </div>
            <OverallModel />
        </>
    )
}

export default Classroom;