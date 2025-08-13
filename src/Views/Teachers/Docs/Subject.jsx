import ButtonComponent from "Components/Button/Button";
import SubjectsCard from "Components/Card/SubjectsCard";
import { useCommonState, useCustomNavigate, useDispatch } from "Components/CustomHooks";
import Img from "Components/Img/Img";
import Tooltip from "Components/Tooltip/Tooltip";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CopyToClipboard from "ResuableFunctions/CopyToClipboard";
import Icons from "Utils/Icons";
import Image from "Utils/Image";
import { getClassroomTeachers, getSubjects } from "../Actions/teacherAction";
import SpinnerComponent from "Components/Spinner/Spinner";
import { updateModalShow } from "Views/Common/Slices/Common_slice";
import { OverallModel } from "../Utils/OverallModal";

const Subject = () => {
    const { class_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    useEffect(()=>{
        if(class_id){
            dispatch(getSubjects({classroom_id:class_id}));
            dispatch(getClassroomTeachers({classroom_id:class_id}))
        }
    },[])

    const {teachersState} = useCommonState();
    const {data,glow} = teachersState?.teacher_GetSubjects; 

    return (
        <div className="h-100">
            <div className="container-fluid">
                <div className="w-100 row justify-content-between align-items-center border-bottom pb-3">
                    <div className="col">
                        <Link to="/teachers_dashboard/classrooms" className="brand-link-color">
                            <span>{Icons.back_button_icon_blue}</span>
                            <span className="align-middle">Back to Classroom</span>
                        </Link>
                    </div>
                    <div className="col-5 row align-items-center justify-content-center">
                        <div className="col text-end pe-4">
                            <ButtonComponent type="button" className="btn-brand-color border py-2"  clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "subjects", modal_type: "subjects" }))}>
                                {Icons.add_icon}
                                <span className="lign-middle">Add Subject</span>
                            </ButtonComponent>
                        </div>

                        <div className="col-6 d-flex justify-content-end align-items-center">
                            <span className="brand-link-color me-3">Class Room ID :</span>
                            <ButtonComponent type="button" className="col-6 bg-transparent border me-2" clickFunction={() => CopyToClipboard("54321", dispatch)}>
                                {Icons.copy_icon}
                                <span className="align-middle ps-14 ps-2">54321</span>
                            </ButtonComponent>
                            <Tooltip tooltip_content="test" />
                        </div>
                    </div>
                </div>

                <div className="w-100 row align-content-start small_header_content_main overflowY">
                    {data?.length < 0 ?
                        <div className="w-100 h-100 row align-items-center justify-content-center">
                            <div className="col-6 text-center">
                                <Img src={Image?.no_data_found} alt="No subjects Found" className="no_data_found_image" />
                                <h6>No subjects were added</h6>
                                <p className="fs-15 text-secondary">Create and send the link to your students to join the subjects.</p>
                                <ButtonComponent type="button" className="btn-brand-color border py-2" clickFunction={() => dispatch(updateModalShow({ show: true, close_btn: true, modal_from: "subjects", modal_type: "subjects" }))}>
                                    {Icons.add_icon}
                                    <span className="lign-middle">Add Subject</span>
                                </ButtonComponent>
                            </div>
                        </div>
                        :
                         data?.map((val, index) => (
                            <div className="col-3 p-2" key={index}>
                                <SubjectsCard cardClassName="w-100 pointer" data={val} buttonName="View" onclickCard={() => navigate(`/teachers_dashboard/classrooms/${class_id}/${index}`)} />
                            </div>
                         ))
                    }
                </div>
            </div>
            <OverallModel />
        </div>
    )
}
export default Subject;