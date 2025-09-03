import { Outlet, useParams } from "react-router-dom";
import Icons from "Utils/Icons";
import JsonData from "Views/Teachers/Utils/JsonData";
import LinkComponent from "Components/Router_components/LinkComponent";
import { useDispatch} from "react-redux";
import { updateStudentClassAndSubject } from "Views/Teachers/Slice/teachersSlice";
import NavLinkComp from "Components/Router_components/NavLink";
import { useEffect } from "react";

const StudentsPerformanceLayout = () => {
    const { class_id, subject_id } = useParams();
    const { jsonOnly } = JsonData({ class_id, subject_id });
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateStudentClassAndSubject({class_id, subject_id}))
    }, [])
    
    return (
        <div>
            <div className="w-100 border-bottom pb-3 mt-3">
                <div className="col">
                    <LinkComponent to={`/teachers_dashboard/classrooms/${class_id}/${subject_id}`} className="brand-link-color">
                        <span>{Icons.back_button_icon_blue}</span>
                        <span className="align-middle">Back to classroom</span>
                    </LinkComponent>
                </div>
            </div>
            <div className="my-4">
                <div className="d-flex justify-content-start align-items-center ms-2">

                    {jsonOnly?.students_performance_options?.map((option, index) => (
                        <NavLinkComp key={index} to={option?.route} className={`students-performance-option px-2`}>
                            <span className="title">{option?.title}</span>
                            <span className="description">{option?.description}</span>
                        </NavLinkComp>
                    ))}
                </div>
            </div>
            
            <>
                <Outlet />
            </>
        </div>
    )
}

export default StudentsPerformanceLayout;