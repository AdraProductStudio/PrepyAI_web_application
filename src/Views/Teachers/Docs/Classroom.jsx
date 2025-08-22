import ButtonComponent from "Components/Button/Button";
import ClassroomCard from "Components/Card/ClassroomCard";
import { useCommonState, useCustomNavigate } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Icons from "Utils/Icons";
import Image from "Utils/Image";
import { getClassrooms, getTeachers } from "../Actions/teacherAction";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { OverallModel } from "../Utils/OverallModal";
import SpinnerComponent from "Components/Spinner/Spinner";

const Classroom = () => {
    const navigate = useCustomNavigate();
    const { teachersState } = useCommonState();
    const { data, glow } = teachersState?.teacher_GetClassrooms;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getClassrooms())
        dispatch(getTeachers());
    }, [])

    return (
        <div className="h-100">
            <div className="container-fluid">
                <div className="w-100 row justify-content-between align-items-center border-bottom pb-3">
                    <div className="col">
                        <h5 className="mb-0">Classrooms</h5>
                    </div>
                    <div className="col text-end">
                        <ButtonComponent type="button" className="btn-brand-color border py-2" clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "TeacherClassroom", modal_type: "createClassroom" }))}>
                            {Icons.add_icon}
                            <span className="lign-middle">Create Classroom</span>
                        </ButtonComponent>
                    </div>
                </div>

                <div className="w-100 row align-content-start small_header_content_main overflowY">
                    {glow ?
                        <div className="w-100 h-100 row align-items-center justify-content-center">
                            <div className="col-6 text-center">
                                <SpinnerComponent />
                                <p className="py-3">Geeting Classrooms Records</p>
                            </div>
                        </div>
                        :
                        data?.length < 0 ?
                            <div className="w-100 h-100 row align-items-center justify-content-center">
                                <div className="col-6 text-center">
                                    <Img src={Image?.no_data_found} alt="No classes Found" className="no_data_found_image" />
                                    <h6>No classes were added</h6>
                                    <p className="fs-15 text-secondary">Create and send the link to your students to join the classes.</p>
                                    <ButtonComponent type="button" className="btn-brand-color border py-2">
                                        {Icons.add_icon}
                                        <span className="lign-middle">Create Classroom</span>
                                    </ButtonComponent>
                                </div>
                            </div>
                            :
                            data?.map((val, index) => (
                                <div className="col-3 p-2" key={index}>
                                    <ClassroomCard cardClassName="w-100 h-100" data={val} buttonName="View" onclick={() => navigate(`/teachers_dashboard/classrooms/${val?.classroom_id}`)} />
                                </div>
                            ))
                    }
                </div>
            </div>
            <OverallModel />
        </div>
    )
}

export default Classroom;